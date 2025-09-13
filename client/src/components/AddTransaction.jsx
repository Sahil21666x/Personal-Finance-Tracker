import React, { useState } from 'react'
import { IndianRupee, Calendar, Type, FileText, Tag } from 'lucide-react'
import Card from './ui/Card'
import Button from './ui/Button'
import { transactionApi } from '../lib/api'
import { useNavigate } from 'react-router-dom'
import Label from './ui/Label'
import Input from './ui/Input'

function AddTransaction() {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      // Validate form
      if (!formData.description || !formData.amount || !formData.category) {
        throw new Error('Please fill in all required fields')
      }
      
      if (formData.amount <= 0) {
        throw new Error('Amount must be greater than zero')
      }
      
      // Submit transaction
      await transactionApi.create(formData)
      setSuccess('Transaction added successfully!')
      
      // Reset form
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
      })
      
      // Redirect to transactions after a short delay
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
      
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || err.message || 'Failed to add transaction')
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    "salary", "food", "vacation","entertainment", "utilities", "transportation", "health", "other"
  ]

  return (
    <div className="md:p-6 max-w-2xl mx-auto mb-32 md:mb-0">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add New Transaction</h1>
        <p className="text-gray-600 mt-2">Record your income or expenses</p>
      </div>

      <Card className="p-4 md:p-6">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</Label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleInputChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">Expense</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleInputChange}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2">Income</span>
              </label>
            </div>
          </div>

          <div>
            <Label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount <span className="text-red-500">*</span>
            </Label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0.00"
                min="0"
                step="1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </Label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="What was this transaction for?"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </Label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </Label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4">
           
            <Button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Transaction'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default AddTransaction