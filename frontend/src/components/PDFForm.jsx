import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';
import RobotoRegular from '../fonts/Roboto-Regular.ttf';
import RobotoItalic from '../fonts/Roboto-Italic.ttf';
import api from '../api';
import NavbarComponent from '../pages/Navbar';
import { Font } from '@react-pdf/renderer';
import SmallIcon from "/Small_Icon.jpeg";

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
    financialLimit: 'ne',
    financialLimitValue: '',	
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Jméno a příjmení je povinné';
    if (!formData.email) newErrors.email = 'E-mail je povinný';
    if (!formData.phone) newErrors.phone = 'Telefon je povinný';
    if (!formData.agree) newErrors.agree = 'Musíte souhlasit se zpracováním osobních údajů';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendPdfToBackend = async () => {
    if (!validateForm()) {
      alert('Vyplňte prosím všechny povinné položky a souhlaste se zpracováním osobních údajů.');
      return;
    }

    try {
      const blob = await pdf(<PdfDocument {...formData} />).toBlob();
      const formDataToSend = new FormData();
      formDataToSend.append('pdf', blob, 'zakazkovy-formular.pdf');

      const res = await api.post('/api/sendPDF', formDataToSend);
      alert('PDF bylo úspěšně odesláno na server.');
    } catch (error) {
      console.error('Chyba při odesílání PDF:', error);
      alert('Nastala chyba při odesílání.');
    }
  };

  return (
    <>
      <NavbarComponent />
      <form style={formStyle}>
        <h2>Zakázkový formulář</h2>
  
        {/* Sekce: Osobní údaje */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Osobní údaje</div>
          <div style={fieldStyle}>
            <label>
              Jméno a příjmení<span style={requiredStar}>*</span>:
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Vaše jméno a příjmení"
            />
            {errors.fullName && <span style={errorStyle}>{errors.fullName}</span>}
          </div>
  
          <div style={fieldStyle}>
            <label>Firma:</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Název firmy"
            />
          </div>
  
          <div style={fieldStyle}>
            <label>IČO:</label>
            <input
              type="text"
              name="ico"
              value={formData.ico}
              onChange={handleChange}
              placeholder="Vaše IČO"
            />
          </div>
  
          <div style={fieldStyle}>
            <label>DIČ:</label>
            <input
              type="text"
              name="dic"
              value={formData.dic}
              onChange={handleChange}
              placeholder="Vaše DIČ"
            />
          </div>
  
          <div style={fieldStyle}>
            <label>Sídlo:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresa sídla"
            />
          </div>
  
          <div style={fieldStyle}>
            <label>
              E-mail<span style={requiredStar}>*</span>:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Váš e-mail"
            />
            {errors.email && <span style={errorStyle}>{errors.email}</span>}
          </div>
  
          <div style={fieldStyle}>
            <label>
              Telefon<span style={requiredStar}>*</span>:
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Váš telefon"
            />
            {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
          </div>
        </div>
  
        {/* Sekce: Detaily zakázky */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Detaily zakázky</div>
          <div style={fieldStyle}>
            <label>
              Typ služby<span style={requiredStar}>*</span>:
            </label>
            <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
              <option value="Rekonstrukce bytu">Rekonstrukce bytu</option>
              <option value="Stavba rodinného domu">Stavba rodinného domu</option>
              <option value="Zateplení fasády">Zateplení fasády</option>
              <option value="Jiné">Jiné</option>
            </select>
          </div>
  
          <div style={fieldStyle}>
            <label>Popis služby:</label>
            <textarea
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleChange}
              placeholder="Popište podrobnosti služby..."
              rows="4"
            />
          </div>
  
          <div style={fieldStyle}>
            <label>Realizace od<span style={requiredStar}>*</span>:</label>
            <input
              type="date"
              name="realizationFrom"
              value={formData.realizationFrom}
              required
              onChange={handleChange}
            />
          </div>
  
          <div style={fieldStyle}>
            <label>Realizace do<span style={requiredStar}>*</span>:</label>
            <input
              type="date"
              name="realizationTo"
              value={formData.realizationTo}
              required
              onChange={handleChange}
            />
          </div>
  
          <div style={fieldStyle}>
            <label>Preferovaný termín:</label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
            />
          </div>
        </div>
  
        {/* Sekce: Finanční informace */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Finanční informace</div>
          <div style={fieldStyle}>
            <label>
              Máte finanční omezení?<span style={requiredStar}>*</span>:
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  name="financialLimit"
                  value="ano"
                  checked={formData.financialLimit === 'ano'}
                  onChange={handleChange}
                  required
                />
                Ano
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  name="financialLimit"
                  value="ne"
                  checked={formData.financialLimit === 'ne'}
                  onChange={handleChange}
                  required
                />
                Ne
              </label>
            </div>
          </div>
  
          <div style={fieldStyle}>
            <label>Finanční omezení:</label>
            <input
              type="text"
              name="financialLimitValue"
              value={formData.financialLimitValue}
              onChange={handleChange}
              placeholder="Finanční omezení"
            />
          </div>
        </div>
  
        {/* Sekce: Dodatečné informace */}
        <div style={sectionStyle}>
          <div style={sectionTitleStyle}>Dodatečné informace</div>
          <div style={fieldStyle}>
            <label>Dodatečné informace:</label>
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
              Souhlasím se zpracováním osobních údajů<span style={requiredStar}>*</span>
            </label>
            {errors.agree && <span style={errorStyle}>{errors.agree}</span>}
          </div>
        </div>
  
        {/* Tlačítko Odeslat */}
        <button type="button" onClick={handleSendPdfToBackend} style={buttonStyle}>
          Odeslat
        </button>
      </form>
    </>
  );
};

const zhotovitelLogo = "/Small_Icon.jpeg";


const formatDate = (dateString) => {
  if (!dateString) return 'Neuvedeno';

  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Měsíce jsou číslovány od 0, proto přidáváme 1
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
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
  financialLimit,
  financialLimitValue
}) => (
<Document>
    <Page size="A4" style={styles.page}>
      <View>
        {/* Nadpis a číslo zakázky */}
        <Text style={styles.title}>ZAKÁZKOVÝ FORMULÁŘ</Text>
        <Text style={styles.subtitle}>ZAKÁZKA Č. …………</Text>

        {/* Flexbox pro objednatele a zhotovitele */}
        <View style={styles.flexRow}>
          {/* Sekce: Kontaktní údaje objednatele */}
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>KONTAKTNÍ ÚDAJE OBJEDNATELE</Text>
            <Text style={styles.text}>JMÉNO: {fullName}</Text>
            <Text style={styles.text}>PŘÍJMENÍ: {fullName.split(' ')[1] || ''}</Text>
            <Text style={styles.text}>FIRMA: {company || 'Neuvedeno'}</Text>
            <Text style={styles.text}>IČO/DIČ: {ico || 'Neuvedeno'} / {dic || 'Neuvedeno'}</Text>
            <Text style={styles.text}>BYDLIŠTĚ/SÍDLO: {address || 'Neuvedeno'}</Text>
            <Text style={styles.text}>TELEFON: {phone}</Text>
            <Text style={styles.text}>E-MAIL: {email}</Text>
          </View>

          {/* Sekce: Zhotovitel */}
          <View style={styles.rightColumn}>
            <Image src={SmallIcon} style={styles.logo} />
            <Text style={styles.sectionTitle}>ZHOTOVITEL</Text>
            <Text style={styles.text}>Masarykovo náměští 105</Text>
            <Text style={styles.text}>675 71, Náměšť nad Oslavou</Text>
            <Text style={styles.text}>Tel./Fax: 568 620 008</Text>
            <Text style={styles.text}>Mobil: 606 686 716, 603 859 971 </Text>
            <Text style={styles.text}>E-mail: vh.mont-stav@seznam.cz</Text>
            <Text style={styles.text}>IČO: 28263511</Text>

          </View>
        </View>

        {/* Sekce: Základní údaje zakázky */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ZÁKLADNÍ ÚDAJE ZAKÁZKY</Text>
          <Text style={styles.text}>MÍSTO REALIZACE: {address || '.....................'}</Text>
          <Text style={styles.text}>
            TERMÍN REALIZACE: OD {formatDate(realizationFrom) || '.....................'} DO {formatDate(realizationTo) || '.....................'}
          </Text>
          <Text style={styles.text}>PREFEROVANÉ DATUM REALIZACE: {formatDate(preferredDate) || '.....................'}</Text>
          <Text style={styles.text}>FINANČNÍ OMEZENÍ: {financialLimit === 'ano' ? 'Ano' : 'Ne'}</Text>
          <Text style={styles.text}>ČÁSTKA: {financialLimitValue || '...................'} Kč</Text>
          <Text style={styles.text}>DALŠÍ INFORMACE: {additionalInfo || '.....................'}</Text>
        </View>

        {/* Sekce: Popis zakázky */}
        <View style={styles.sectionDesc} >
          <Text style={styles.sectionTitle}>POPIS ZAKÁZKY</Text>
          <Text style={styles.text}>{serviceDescription || ''}</Text>
        </View>

        {/* Sekce: Závazná objednávka */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ZÁVAZNÁ OBJEDNÁVKA</Text>
          <Text style={styles.text}>V: …………………………………..</Text>
          <Text style={styles.text}>DNE: …………………………………..</Text>
          <Text style={styles.text}>PODPIS OBJEDNAVATELE: …………………………………..</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Stylování pro PDF a formulář
const styles = StyleSheet.create({
  sectionDesc:{
    minHeight: '150px',
    marginBottom: 10,
    padding: 10,
    border: '3px solid #000',
    borderRadius: 10,
    alignItems: 'left',
  },
  page: {
    padding: 20,
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: '3px solid #000',
    borderRadius: 10,
    alignItems: 'left',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  leftColumn: {
    width: '60%',
    padding: 10,
    border: '3px solid #000',
    borderRadius: 10,
  },
  rightColumn: {
    width: '40%',
    padding: 10,
    border: '3px solid #000',
    borderRadius: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: "center",
  },
  text: {
    marginBottom: 5,
  },
  logo: {
    width: 80,
    height: 50,
    marginBottom: 10,
  },
});

const formStyle = {
  maxWidth: '800px', // Zvětšíme šířku formuláře
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const sectionStyle = {
  marginBottom: '20px',
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#fff',
};

const sectionTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '15px',
  color: '#333',
  borderBottom: '2px solid #007bff',
  paddingBottom: '5px',
};

const fieldStyle = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
};

const checkboxStyle = {
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const requiredStar = { color: 'red', marginLeft: '5px' };
const errorStyle = { color: 'red', fontSize: '12px', marginTop: '5px' };

export default OrderForm;