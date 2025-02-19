import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import RobotoRegular from '../fonts/Roboto-Regular.ttf';
import RobotoItalic from '../fonts/Roboto-Italic.ttf';
import api from '../api';

// Registrace fontu
Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 'normal' },
    { src: RobotoItalic, fontStyle: 'italic' },
  ],
});

const OrderForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    ico: '',
    dic: '',
    address: '',
    email: '',
    phone: '',
    serviceType: 'Rekonstrukce bytu',
    serviceDescription: '',
    realizationFrom: '',
    realizationTo: '',
    preferredDate: '',
    additionalInfo: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSendPdfToBackend = async () => {
    try {
      const blob = await pdf(<PdfDocument {...formData} />).toBlob();
      const formDataToSend = new FormData();
      formDataToSend.append('pdf', blob, 'zakazkovy-formular.pdf'); // Připojíme PDF soubor

      const res = await api.post('/api/sendPDF', formDataToSend)

      alert('PDF bylo úspěšně odesláno na server.');
    } catch (error) {
      console.error('Chyba při odesílání PDF:', error);
      alert('Nastala chyba při odesílání.');
    }
  };




  return (
    <form style={formStyle}>
      <h2>Zakázkový formulář</h2>

      <div style={fieldStyle}>
        <label>Jméno a příjmení (povinné):</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Vaše jméno a příjmení"
        />
      </div>

      <div style={fieldStyle}>
        <label>Firma (nepovinné):</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Název firmy"
        />
      </div>

      <div style={fieldStyle}>
        <label>IČO (nepovinné):</label>
        <input
          type="text"
          name="ico"
          value={formData.ico}
          onChange={handleChange}
          placeholder="Vaše IČO"
        />
      </div>

      <div style={fieldStyle}>
        <label>DIČ (nepovinné):</label>
        <input
          type="text"
          name="dic"
          value={formData.dic}
          onChange={handleChange}
          placeholder="Vaše DIČ"
        />
      </div>

      <div style={fieldStyle}>
        <label>Sídlo (nepovinné):</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Adresa sídla"
        />
      </div>

      <div style={fieldStyle}>
        <label>E-mail (povinné):</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Váš e-mail"
        />
      </div>

      <div style={fieldStyle}>
        <label>Telefon (povinné):</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Váš telefon"
        />
      </div>

      <div style={fieldStyle}>
        <label>Typ služby (povinné):</label>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
          <option value="Rekonstrukce bytu">Rekonstrukce bytu</option>
          <option value="Stavba rodinného domu">Stavba rodinného domu</option>
          <option value="Zateplení fasády">Zateplení fasády</option>
          <option value="Jiné">Jiné</option>
        </select>
      </div>

      <div style={fieldStyle}>
        <label>Popis služby (nepovinné):</label>
        <textarea
          name="serviceDescription"
          value={formData.serviceDescription}
          onChange={handleChange}
          placeholder="Popište podrobnosti služby..."
          rows="4"
        />
      </div>

      <div style={fieldStyle}>
        <label>Realizace od (nepovinné):</label>
        <input
          type="date"
          name="realizationFrom"
          value={formData.realizationFrom}
          onChange={handleChange}
        />
      </div>

      <div style={fieldStyle}>
        <label>Realizace do (nepovinné):</label>
        <input
          type="date"
          name="realizationTo"
          value={formData.realizationTo}
          onChange={handleChange}
        />
      </div>

      <div style={fieldStyle}>
        <label>Preferovaný termín (nepovinné):</label>
        <input
          type="date"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
        />
      </div>

      <div style={fieldStyle}>
        <label>Dodatečné informace (nepovinné):</label>
        <textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Zde můžete přidat dodatečné informace..."
          rows="4"
        />
      </div>

      <div style={checkboxStyle}>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          Souhlasím se zpracováním osobních údajů (povinné)
        </label>
      </div>

      <button type="button" onClick={handleSendPdfToBackend} style={buttonStyle}>
        Stáhnout PDF
      </button>
    </form>
  );
};

// PDF dokument generovaný z formulářových dat
const PdfDocument = ({
  fullName,
  company,
  ico,
  dic,
  address,
  email,
  phone,
  serviceType,
  serviceDescription,
  realizationFrom,
  realizationTo,
  preferredDate,
  additionalInfo,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Zakázkový formulář</Text>
        <Text style={styles.text}>Jméno a příjmení: {fullName}</Text>
        <Text style={styles.text}>Firma: {company || 'Neuvedeno'}</Text>
        <Text style={styles.text}>IČO: {ico || 'Neuvedeno'}</Text>
        <Text style={styles.text}>DIČ: {dic || 'Neuvedeno'}</Text>
        <Text style={styles.text}>Sídlo: {address || 'Neuvedeno'}</Text>
        <Text style={styles.text}>E-mail: {email}</Text>
        <Text style={styles.text}>Telefon: {phone}</Text>
        <Text style={styles.text}>Typ služby: {serviceType}</Text>
        <Text style={styles.text}>Popis služby: {serviceDescription || 'Neuvedeno'}</Text>
        <Text style={styles.text}>Realizace od: {realizationFrom || 'Neuvedeno'}</Text>
        <Text style={styles.text}>Realizace do: {realizationTo || 'Neuvedeno'}</Text>
        <Text style={styles.text}>Preferovaný termín: {preferredDate || 'Neuvedeno'}</Text>
        <Text style={styles.text}>Dodatečné informace: {additionalInfo || 'Neuvedeno'}</Text>
      </View>
    </Page>
  </Document>
);

// Stylování pro PDF a formulář
const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12, fontFamily: 'Roboto' },
  section: { marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 10, fontFamily: 'Roboto', fontWeight: 'bold' },
  text: { marginBottom: 5, fontFamily: 'Roboto' },
});

const formStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const fieldStyle = { marginBottom: '15px' };
const checkboxStyle = { marginBottom: '20px' };
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default OrderForm;
