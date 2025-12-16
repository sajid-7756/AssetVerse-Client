import { useNavigate } from 'react-router'
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden'>
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-lime-200/30 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className='relative container flex flex-col items-center px-6 py-12 mx-auto text-center'>
        <div className="p-8 bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl max-w-lg w-full">
          
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-lime-100 rounded-full text-lime-600 animate-bounce">
              <FaExclamationTriangle className="w-12 h-12" />
            </div>
          </div>

          <h1 className='mt-3 text-4xl font-bold text-gray-800 md:text-5xl'>
            Whoops!
          </h1>
          <p className='mt-4 text-gray-600 text-lg'>
            It seems like you've stumbled upon a page that doesn't exist or an error occurred.
          </p>

          <div className='flex items-center justify-center w-full mt-8 gap-x-4'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center px-6 py-3 text-sm text-gray-700 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:shadow-md gap-x-2'
            >
              <FaArrowLeft className='w-4 h-4' />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className='flex items-center justify-center px-6 py-3 text-sm text-white transition-all duration-300 bg-lime-500 rounded-xl hover:bg-lime-600 hover:shadow-lg hover:shadow-lime-200 gap-x-2'
            >
              <FaHome className='w-4 h-4' />
              <span>Back Home</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage
