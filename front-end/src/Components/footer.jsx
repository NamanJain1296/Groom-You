import React from 'react'

function Footer() {
    return (
        <div style={{ background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '1.2rem', color: '#0f0f0f' }}>
            © {new Date().getFullYear()} Groom You. All rights reserved.
          </p>
        </div>
    )
}

export default Footer