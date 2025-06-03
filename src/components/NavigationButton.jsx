function NavigationButton({ type, onClick }) {
  let icon;

  switch(type) {
    case 'previous':
      icon = (
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer"
        >
          <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"/>
        </svg>      
        );
      break;
    case 'home':
      icon = (
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer"
        >
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>        
        );
      break;
    case 'next':
      icon = (
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer"
        >
          <path d="M6 9h6V5l7 7-7 7v-4H6V9z"/>
        </svg>
      );
      break;
    default:
      return null;
  }

  return (
    <button onClick={onClick}>
      {icon}
    </button>
  )
}

export default NavigationButton