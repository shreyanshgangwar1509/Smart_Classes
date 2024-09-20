import { useState } from 'react';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New class added to your schedule.' },
    { id: 2, message: 'Assignment submission deadline is tomorrow.' },
    { id: 3, message: 'New alert: Campus closed on Friday.' },
  ]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container">
      <button onClick={handleToggle} className="notification-button">
        Notifications
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                {notification.message}
              </div>
            ))
          ) : (
            <div className="notification-item">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notification;
