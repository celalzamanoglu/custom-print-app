import Link from 'next/link';

const steps = [
  { id: 1, title: 'UPLOAD YOUR LOGO', description: 'Upload vector image file – .pdf, .png, .jpg, or .eps vector graphic.', icon: '📤' },
  { id: 2, title: 'DESIGN YOUR PAPER', description: 'Adjust your logo or image in the design tool on the paper and design it.', icon: '🎨' },
  { id: 3, title: 'SELECT PAPER CHOICES', description: 'Select paper size, print color(s), white or Kraft paper, and sheet quantity.', icon: '📄' },
];

export default function Home() {
  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Custom Print</h1>
      <h2>Design Your Own Custom Printed Paper that&apos;s Greaseproof In 3 Easy Steps!</h2>
      <p style={{ maxWidth: '800px', margin: '0 auto' }}>
        Create your own branded greaseproof paper in our design tool, or upload your own graphic design art. We will do the rest and deliver your order upon completion! Available in white or Kraft paper using 1 color, 2 color, and 4 color printing process.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', margin: '2rem 0' }}>
        {steps.map((step) => (
          <div key={step.id} style={{ textAlign: 'center', margin: '1rem', maxWidth: '300px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{step.icon}</div>
            <h3>STEP {step.id}</h3>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      <Link href="/designer">
        <button style={{ 
          backgroundColor: 'var(--primary-color)', 
          color: 'white', 
          padding: '0.5rem 1rem', 
          borderRadius: '0.25rem',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.2rem',
          margin: '0 auto',
          display: 'block'
        }}>
          Start Designing
        </button>
      </Link>
    </main>
  );
}