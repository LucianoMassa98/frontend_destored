function HomePage() {

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('/public/Logo_Destored.svg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4">
          <img src="/public/estrecharmano.png" alt="Handshake" className="w-40 h-40 md:w-60 md:h-60 object-contain mb-4" /> {/* Replace with your image path */}
          <h1 className="text-4xl md:text-6xl text-white font-bold text-center">Freelance DestoRed</h1>
          <p className="mt-4 text-xl text-white text-center">Conecta con las mejores oportunidades y el talento que necesitas.</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Tu Plataforma para el Trabajo Freelance</h2>
          <p className="mt-4 text-lg text-gray-600">
            Freelance DestoRed es el lugar donde freelancers talentosos y empresas innovadoras se encuentran para colaborar en proyectos emocionantes.
          </p>
        </div>

        {/* Information for Freelancers */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Para Freelancers</h3>
          <p className="text-gray-700 leading-relaxed">
            En Freelance DestoRed, encontrarás un mundo de oportunidades. Accede a proyectos interesantes de diversas industrias, establece tus propias tarifas y horarios, y construye tu portafolio. Nuestra plataforma te conecta directamente con clientes potenciales, eliminando intermediarios y comisiones excesivas.
            Amplía tu red profesional y haz crecer tu carrera. ¡Únete a nuestra comunidad y lleva tu trabajo freelance al siguiente nivel!
          </p>
          <div className="mt-6 text-center">
            <a href="/registro" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              Regístrate como Freelancer
            </a>
          </div>
        </div>

        {/* Information for Companies/Entrepreneurs */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-bold text-green-600 mb-4">Para Empresas y Emprendedores</h3>
          <p className="text-gray-700 leading-relaxed">
            Encuentra el talento freelance ideal para tus proyectos en Freelance DestoRed. Accede a un amplio directorio de profesionales verificados con diversas habilidades y experiencias. Publica tus proyectos de forma gratuita y recibe propuestas de freelancers interesados. Gestiona la comunicación, los pagos y la entrega de forma segura y eficiente a través de nuestra plataforma. Ahorra tiempo y recursos al contratar freelancers calificados para impulsar tu negocio.
          </p>
          <div className="mt-6 text-center">
            <a href="/registro" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              Publica un Proyecto
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage
