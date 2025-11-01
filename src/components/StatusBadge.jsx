import { CheckCircle, AlertTriangle, Clock, XCircle } from 'lucide-react';

const StatusBadge = ({ status, text, size = 'normal' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'compliant':
      case 'success':
      case 'completed':
        return {
          icon: CheckCircle,
          className: 'bg-success-50 text-success-600 border-success-200',
          emoji: '✅'
        };
      case 'warning':
      case 'needs-attention':
        return {
          icon: AlertTriangle,
          className: 'bg-warning-50 text-warning-600 border-warning-200',
          emoji: '⚠️'
        };
      case 'critical':
      case 'danger':
      case 'violation':
        return {
          icon: XCircle,
          className: 'bg-danger-50 text-danger-600 border-danger-200',
          emoji: '❌'
        };
      case 'pending':
      case 'processing':
        return {
          icon: Clock,
          className: 'bg-primary-50 text-primary-600 border-primary-200',
          emoji: '⏳'
        };
      default:
        return {
          icon: CheckCircle,
          className: 'bg-gray-50 text-gray-600 border-gray-200',
          emoji: '•'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;
  
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    normal: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-semibold border ${config.className} ${sizeClasses[size]}`}>
      <span>{config.emoji}</span>
      {text && <span>{text}</span>}
    </span>
  );
};

export default StatusBadge;