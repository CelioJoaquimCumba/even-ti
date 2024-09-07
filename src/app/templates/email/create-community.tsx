/* eslint-disable @next/next/no-img-element */
import * as React from 'react'

interface EmailTemplateProps {
  username: string
  id: string
  email: string
  background: string
  logo: string
  name: string
  description?: string
  slogan?: string
  site?: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
  id,
  email,
  background,
  logo,
  name,
  description,
  slogan,
  site,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        padding: '20px',
      }}
    >
      <img
        src={logo}
        alt="Community Logo"
        style={{ width: '100px', marginBottom: '10px' }}
      />
    </div>
    <h1>New Community Creation Request</h1>
    <p>
      <strong>Requested by:</strong>
    </p>
    <ul>
      <li>
        <strong>Username:</strong> {username}
      </li>
      <li>
        <strong>User ID:</strong> {id}
      </li>
      <li>
        <strong>User Email:</strong> {email}
      </li>
    </ul>
    <p>
      <strong>Community Details:</strong>
    </p>
    <ul>
      <li>
        <strong>Community Name:</strong> {name}
      </li>
      {description && (
        <li>
          <strong>Description:</strong> {description}
        </li>
      )}
      {slogan && (
        <li>
          <strong>Slogan:</strong> {slogan}
        </li>
      )}
      {site && (
        <li>
          <strong>Website:</strong> <a href={site}>{site}</a>
        </li>
      )}
    </ul>
    <p>
      <strong>Background Image URL:</strong> {background}
    </p>
    <p>
      <strong>Logo Image URL:</strong> {logo}
    </p>
  </div>
)
