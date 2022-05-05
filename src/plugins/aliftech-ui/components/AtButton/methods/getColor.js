export const getColor = (color, loading = false, disabled = false) => {
  switch (color) {
    case 'primary':
      return `border-transparent text-alpha ${
        loading || disabled
          ? 'bg-primary-400 text-opacity-90'
          : 'bg-primary-600 hover:bg-primary-500 ' +
            'focus:bg-primary-700 focus:border-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 active:bg-primary-700 ' +
            'dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:border-primary-500 dark:focus:ring-primary-500'
      }`;
    case 'secondary':
      return `border-transparent  ${
        loading || disabled
          ? 'text-primary-400 bg-primary-50 dark:bg-primary-400 dark:bg-opacity-20'
          : 'text-primary-700 bg-primary-100 hover:bg-primary-50 ' +
            'focus:border-primary-300 focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 active:bg-primary-200 ' +
            'dark:text-primary-300 dark:bg-primary-500 dark:bg-opacity-20 dark:hover:bg-primary-600 dark:hover:bg-opacity-50 ' +
            'dark:focus:border-primary-300 dark:focus:ring-primary-300'
      }`;
    case 'danger':
      return `border-transparent text-white ${
        loading || disabled
          ? 'bg-red-400'
          : 'bg-red-500 hover:bg-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:bg-red-600'
      }`;
    case 'success':
      return `border-transparent text-white ${
        loading || disabled
          ? 'bg-green-400'
          : 'bg-green-500 hover:bg-green-400 focus:border-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:bg-green-600'
      }`;
    case 'warning':
      return `border-transparent ${
        loading || disabled
          ? 'text-gray-500 bg-yellow-200'
          : 'text-black bg-yellow-300 hover:bg-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 focus:ring-opacity-50 active:bg-yellow-400'
      }`;
    case 'white':
      return `border-gray-300 ${
        loading || disabled
          ? 'text-gray-400 bg-gray-50'
          : 'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:text-gray-800 active:bg-gray-50'
      }`;
    default:
      return `border-gray-300 dark:border-gray-600 ${
        loading || disabled
          ? 'text-gray-400 dark:text-gray-200 bg-gray-50 dark:bg-gray-600'
          : 'text-gray-700 bg-white hover:text-gray-500 focus:border-blue-300 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 active:text-gray-800 active:bg-gray-50 ' +
            'dark:text-white dark:bg-gray-700 dark:hover:text-gray-200 dark:focus:border-blue-700 dark:active:bg-gray-600 dark:focus:ring-primary-600'
      }`;
  }
};
