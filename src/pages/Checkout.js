const ShippingForm = ({ shippingData, setShippingData, onNext }) => {
  const navigate = useNavigate();
  const [isPlanetSelected, setIsPlanetSelected] = useState(!!shippingData.planet);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const formattedValue = value.replace(/[^\d+\s]/g, '');
      setShippingData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setShippingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlanetSelect = () => {
    navigate('/planet-selection', { state: { from: '/checkout', step: 2 } });
  };

  const handleNext = () => {
    const { firstName, lastName, country, city, street, postalCode, phone, email, planet } = shippingData;
    if (!firstName || !lastName || !country || !city || !street || !postalCode || !phone || !email || !planet) {
      toast.error('Please fill out all required fields, including destination planet');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!/^\+?\d{10,15}$/.test(phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid phone number');
      return;
    }
    onNext();
  };

  useEffect(() => {
    const handlePlanetSelected = (event) => {
      const planetName = event.detail.planetName;
      setShippingData((prev) => ({ ...prev, planet: planetName }));
      setIsPlanetSelected(true);
    };

    window.addEventListener('planetSelected', handlePlanetSelected);
    return () => {
      window.removeEventListener('planetSelected', handlePlanetSelected);
    };
  }, [setShippingData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="shipping-form"
    >
      <h2 className="section-title">Shipping Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName" className={!isPlanetSelected ? 'disabled-label' : ''}>First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={shippingData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className={!isPlanetSelected ? 'disabled-label' : ''}>Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={shippingData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country" className={!isPlanetSelected ? 'disabled-label' : ''}>Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={shippingData.country}
            onChange={handleChange}
            placeholder="Azerbaijan"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city" className={!isPlanetSelected ? 'disabled-label' : ''}>City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingData.city}
            onChange={handleChange}
            placeholder="Baku"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="street" className={!isPlanetSelected ? 'disabled-label' : ''}>Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={shippingData.street}
            onChange={handleChange}
            placeholder="123 Main St"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode" className={!isPlanetSelected ? 'disabled-label' : ''}>Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingData.postalCode}
            onChange={handleChange}
            placeholder="AZ1000"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone" className={!isPlanetSelected ? 'disabled-label' : ''}>Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingData.phone}
            onChange={handleChange}
            placeholder="+994123456789"
            pattern="^\+?\d{10,15}$"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className={!isPlanetSelected ? 'disabled-label' : ''}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={shippingData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            required
            disabled={!isPlanetSelected}
            className={!isPlanetSelected ? 'disabled-input' : ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="planet">Destination Planet</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              id="planet"
              name="planet"
              value={shippingData.planet || ''}
              readOnly
              placeholder="Select your destination planet"
              required
              className="planet-input"
            />
            <motion.button
              type="button"
              className="next-btn"
              onClick={handlePlanetSelect}
              whileHover={{ scale: 1.1, rotate: 360 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Rocket size={20} />
            </motion.button>
          </div>
        </div>
      </div>
      <div className="form-actions">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="next-btn"
          disabled={!isPlanetSelected}
        >
          Next <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
};
