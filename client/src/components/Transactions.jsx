import React, { useEffect, useState } from 'react'
import { transactionApi } from '../lib/api'
import { IndianRupee, Pen, Trash, X, Plus } from 'lucide-react'
import Card from './ui/Card'
import Label from './ui/Label'
import Input from './ui/Input'

function Transactions({ user }) {
  const [transactions, setTransactions] = useState([])
  const [editModel, setEditModel] = useState(false)
  const [deleteModel, setDeleteModel] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: ''
  })

  // Fetch transactions
  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const res = await transactionApi.getAll()
      setTransactions(res.data)
    } catch (error) {
      console.error(error)
      setError('Failed to fetch transactions')
    } finally {
      setLoading(false)
    }
  }

  // Handle edit transaction
  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction)
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: new Date(transaction.date).toISOString().split('T')[0]
    })
    setEditModel(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await transactionApi.update(selectedTransaction._id, formData)
      setEditModel(false)
      setSuccess('Transaction updated successfully!')
      fetchTransactions() // Refresh the list
    } catch (error) {
      console.error(error)
      setError('Failed to update transaction')
    }
  }

  // Handle delete transaction
  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction)
    setDeleteModel(true)
  }

  const handleDeleteConfirm = async () => {
    try {
      await transactionApi.delete(selectedTransaction._id)
      setDeleteModel(false)
      setSuccess('Transaction deleted successfully!')
      fetchTransactions() // Refresh the list
    } catch (error) {
      console.error(error)
      setError('Failed to delete transaction')
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  // Calculate total balance
  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => {
      return transaction.type === 'income' 
        ? total + transaction.amount 
        : total - transaction.amount
    }, 0)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading transactions...</div>
      </div>
    )
  }

  return (
    <div className=" p-4 md:p-6  mb-20 md:mb-0">
      <h1 className="text-2xl md:text-2xl font-bold mb-2">Welcome {user?.name}!</h1>
      <p className="text-gray-600 mb-6">Here Are Your Transactions Overview</p>
      
      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-blue-50">
          <h3 className="text-sm font-semibold text-gray-600">Total Balance</h3>
          <p className={`text-2xl font-bold ${calculateBalance() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹ {formatCurrency(Math.abs(calculateBalance()))}
          </p>
        </Card>
        <Card className="p-4 bg-green-50">
          <h3 className="text-sm font-semibold text-gray-600">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹ {formatCurrency(transactions
              .filter(t => t.type === 'income')
              .reduce((sum, t) => sum + t.amount, 0))}
          </p>
        </Card>
        <Card className="p-4 bg-red-50">
          <h3 className="text-sm font-semibold text-gray-600">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            ₹ {formatCurrency(transactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + t.amount, 0))}
          </p>
        </Card>
      </div>

      {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

      {/* Transactions Table */}
      <Card className="w-full overflow-x-auto">
        <h2 className='text-left text-lg font-medium'> Transaction History</h2>
        <h3 className='text-sm text-gray-500'>total {transactions.length} transactions</h3>
        <div className="min-w-full mt-5">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 font-semibold text-sm">Date</th>
                <th className="text-left p-3 font-semibold text-sm">Description</th>
                <th className="text-left p-3 font-semibold text-sm">Amount</th>
                <th className="text-left p-3 font-semibold text-sm hidden md:table-cell">Type</th>
                <th className="text-left p-3 font-semibold text-sm hidden lg:table-cell">Category</th>
                <th className="text-left p-3 font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No transactions found. Add your first transaction to get started.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="p-3 text-sm font-medium">{transaction.description}</td>
                    <td 
                      className={`p-3 font-semibold text-sm ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {transaction.type === 'income' ? '+' : '-'} ₹ {formatCurrency(transaction.amount)}
                    </td>
                    <td className="p-3 text-sm hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-3 text-sm hidden lg:table-cell">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditClick(transaction)} 
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                          aria-label="Edit transaction"
                        >
                          <Pen size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(transaction)} 
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                          aria-label="Delete transaction"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Modal */}
      {editModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Transaction</h2>
              <button onClick={() => setEditModel(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                <Label className="block text-sm font-medium text-gray-700 mb-1">Description</Label>
                 <Input 
                 placeholder="Description"
                 name="description"
                 value={formData.description}
                 onChange={handleInputChange}
                 required
                 ></Input>
                </div>
                <div>
                 <Label className="block text-sm font-medium text-gray-700 mb-1">Amount</Label>
                 <Input 
                 placeholder="Amount"
                 name="amount"
                 value={formData.amount}
                 onChange={handleInputChange}
                 required
                 ></Input>
                </div>
                <div>
                   <Label className="block text-sm font-medium text-gray-700 mb-1">Type</Label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Category</Label>
                 <select
                    name="type"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="vacation">vacation</option>
                    <option value="transportation">transportation</option>
                    <option value="food">food</option>
                    <option value="salary">salary</option>
                    <option value="entertainment">entertainment</option>
                    <option value="utilities">utilities</option>
                    <option value="health">health</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  ></Input>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModel(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Update Transaction
                  </button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Delete Transaction</h2>
              <button onClick={() => setDeleteModel(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <p className="mb-6">
              Are you sure you want to delete the transaction "{selectedTransaction?.description}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModel(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Transactions