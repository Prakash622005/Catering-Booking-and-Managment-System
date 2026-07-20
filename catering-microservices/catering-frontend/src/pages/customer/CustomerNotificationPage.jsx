import { useEffect, useState } from "react";

import CustomerLayout from "../../layouts/CustomerLayout";

import NotificationCard from "../../components/notification/NotificationCard";

import { getAllNotifications } from "../../services/notificationService";

function CustomerNotificationPage() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications = async () => {

    try {

      const data = await getAllNotifications();

      setNotifications(data);

    } catch (error) {

      console.error(error);
    }
  };

  return (

    <CustomerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Notifications

      </h1>

      <div className="space-y-6">

        {notifications.map((notification) => (

          <NotificationCard
            key={notification.notificationId}
            notification={notification}
          />
        ))}

      </div>

    </CustomerLayout>
  );
}

export default CustomerNotificationPage;