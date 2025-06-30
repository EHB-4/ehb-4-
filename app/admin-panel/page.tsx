export default function AdminPanelPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb' }}>EHB Admin Panel</h1>
      <p style={{ fontSize: '1.2rem', color: '#555' }}>
        This is the admin panel root page. If you see this, the route is working!
      </p>
    </div>
  );
}
