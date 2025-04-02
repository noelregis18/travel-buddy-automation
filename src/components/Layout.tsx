
import React from 'react';
import { Plane, Hotel, Mail, MapPin, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

const steps = [
  { name: 'Lead', icon: <Settings className="step-icon" size={20} /> },
  { name: 'Flight', icon: <Plane className="step-icon" size={20} /> },
  { name: 'Hotel', icon: <Hotel className="step-icon" size={20} /> },
  { name: 'Email', icon: <Mail className="step-icon" size={20} /> },
  { name: 'Supplier', icon: <MapPin className="step-icon" size={20} /> },
];

const Layout: React.FC<LayoutProps> = ({ children, currentStep }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            Travel Buddy Automation
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center md:justify-between">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`step-item ${
                  currentStep === i + 1
                    ? 'active'
                    : currentStep > i + 1
                    ? 'complete'
                    : ''
                }`}
              >
                <div
                  className={`step ${
                    currentStep === i + 1
                      ? 'active'
                      : currentStep > i + 1
                      ? 'complete'
                      : ''
                  }`}
                >
                  {currentStep > i + 1 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.icon
                  )}
                </div>
                <p className="text-sm mt-2 font-medium">{step.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
