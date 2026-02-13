import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulação de verificação de auth
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      navigate('/onboarding');
      localStorage.setItem('hasSeenOnboarding', 'true');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default Index;