import Navbar from '../../components/Navbar';
import ServiceCard from '../../components/ServiceCard';

export default function Services() {
  const services = [
    { title: 'Cloud Solutions', description: 'Reliable cloud-based deployment and scalability.' },
    { title: 'Network Security', description: 'Protect data and infrastructure from cyber threats.' },
    { title: 'IT Consultancy', description: 'Expert guidance to optimize your technology stack.' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Our IT Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={i} title={s.title} description={s.description} />
          ))}
        </div>
      </main>
    </div>
  );
}