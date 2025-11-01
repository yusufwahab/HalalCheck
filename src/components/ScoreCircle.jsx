import { CheckCircle, AlertTriangle } from 'lucide-react';

const ScoreCircle = ({ score, size = 'normal', showIcon = true }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600 bg-success-50 border-success-200';
    if (score >= 60) return 'text-warning-600 bg-warning-50 border-warning-200';
    return 'text-danger-600 bg-danger-50 border-danger-200';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="h-4 w-4 text-success-500" />;
    return <AlertTriangle className="h-4 w-4 text-warning-500" />;
  };

  const sizeClasses = {
    small: 'w-16 h-16 text-sm',
    normal: 'w-20 h-20 text-base',
    large: 'w-32 h-32 text-2xl'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full border-2 flex flex-col items-center justify-center font-bold ${getScoreColor(score)}`}>
      <span className="leading-none">{score}</span>
      <span className="text-xs opacity-75">/100</span>
      {showIcon && size !== 'small' && (
        <div className="absolute -bottom-1 -right-1">
          {getScoreIcon(score)}
        </div>
      )}
    </div>
  );
};

export default ScoreCircle;