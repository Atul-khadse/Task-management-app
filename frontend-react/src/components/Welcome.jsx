const Welcome = ({ showUserLogin, showAdminLogin }) => (
<div className="text-center bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-lg shadow-lg">
<h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Zidio Task Management System</h1>
<p className="mb-4 text-gray-600">Manage your tasks efficiently</p>
<button
  onClick={showUserLogin}
  className="px-6 py-3 m-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95"
>
  User Login
</button>
<button onClick={showAdminLogin} className="px-6 py-3 m-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95">Admin Login</button>
</div>
);
export default Welcome;