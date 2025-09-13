import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Transactions from '../components/Transactions'
import Button from '../components/ui/Button'
import AddTransaction from '../components/AddTransaction'
import { Wallet, Plus, IndianRupee, LogOut, Menu, X, Home, BarChart3, User } from 'lucide-react'

function DashBoard() {
    const [main, setMain] = useState('transactions')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user'))
        if (userData) {
            setUser(userData)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
    }


    const handleNavigation = (section) => {
        setMain(section)
        setIsMobileMenuOpen(false)
    }

    return (
        <div className='flex flex-col md:flex-row max-h-screen bg-gray-50'>
            {/* Mobile Header */}
            <div className='flex items-center justify-between p-4 bg-black text-white md:hidden'>
                <div className='flex items-center space-x-2'>
                    <Wallet size={24} />
                    <span className='font-bold text-lg'>Finance Manager</span>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-black text-white md:h-screen flex-shrink-0`}>
                <div className='p-5 border-b border-indigo-700 hidden md:block'>
                    <div className='flex items-center space-x-3'>
                        <Wallet size={32} className='text-indigo-200' />
                        <h1 className='text-xl font-bold'>Finance Manager</h1>
                    </div>
                    {user && (
                        <div className='mt-4 flex items-center space-x-2 text-indigo-200'>
                            <User size={16} />
                            <span className='text-sm'>{user.name}</span>
                        </div>
                    )}
                </div>

                <nav className='p-4 space-y-2'>
                    <Button 
                        onClick={() => handleNavigation('transactions')} 
                        className={`w-full justify-start ${main === 'transactions' ? 'bg-indigo-900 text-white' : 'bg-transparent hover:bg-indigo-700 text-indigo-100'}`}
                    >
                        <BarChart3 size={18} className="mr-2" />
                        Transactions
                    </Button>
                    <Button 
                        onClick={() => handleNavigation('add-transaction')} 
                        className={`w-full justify-start ${main === 'add-transaction' ? 'bg-indigo-900 text-white' : 'bg-transparent hover:bg-indigo-700 text-indigo-100'}`}
                    >
                        <Plus size={18} className="mr-2" />
                        Add Transaction
                    </Button>
                </nav>

                <div className='absolute w-56 bottom-0 p-4 border-t border-indigo-700 hidden md:block'>
                    <Button 
                        onClick={handleLogout} 
                        className="w-full justify-start bg-transparent hover:bg-indigo-100 text-indigo-700"
                    >
                        <LogOut size={18} className="mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Mobile menu footer */}
                <div className='p-4 border-t border-indigo-700 mt-4 md:hidden'>
                    {user && (
                        <div className='mb-4 flex items-center space-x-2 text-indigo-200'>
                            <User size={16} />
                            <span>{user.name}</span>
                        </div>
                    )}
                    <Button 
                        onClick={handleLogout} 
                        className="w-full justify-center bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                        <LogOut size={18} className="mr-2" />
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-4 md:p-6 overflow-auto'>
                {main === 'transactions' ? <Transactions user={user} /> : <AddTransaction />}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 flex justify-around'>
                <button 
                    onClick={() => handleNavigation('transactions')}
                    className={`flex flex-col items-center p-2 rounded-lg ${main === 'transactions' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
                >
                    <BarChart3 size={20} />
                    <span className='text-xs mt-1'>Transactions</span>
                </button>
                <button 
                    onClick={() => handleNavigation('add-transaction')}
                    className={`flex flex-col items-center p-2 rounded-lg ${main === 'add-transaction' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'}`}
                >
                    <Plus size={20} />
                    <span className='text-xs mt-1'>Add</span>
                </button>
                <button 
                    onClick={handleLogout}
                    className='flex flex-col items-center p-2 rounded-lg text-gray-600'
                >
                    <LogOut size={20} />
                    <span className='text-xs mt-1'>Logout</span>
                </button>
            </div>

        </div>
    )
}

export default DashBoard