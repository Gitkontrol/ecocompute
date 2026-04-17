const ServiceCard = ({ title, description }) => {
  return (
    <div className="dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 font-sans">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;