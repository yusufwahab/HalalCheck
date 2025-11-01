const ProgressBar = ({ value, max = 100, color = 'primary', size = 'normal', showLabel = false }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success-500';
      case 'warning':
        return 'bg-warning-500';
      case 'danger':
        return 'bg-danger-500';
      case 'primary':
      default:
        return 'bg-primary-500';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'small':
        return 'h-1';
      case 'large':
        return 'h-4';
      case 'normal':
      default:
        return 'h-2';
    }
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getSizeClasses(size)}`}>
        <div 
          className={`h-full transition-all duration-300 ease-out ${getColorClasses(color)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-gray-500 mt-1 text-center">
          {percentage.toFixed(0)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;