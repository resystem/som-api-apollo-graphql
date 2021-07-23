import { dateToStringDDMMYYY } from "../utils/date.util";
import { extractNumbers } from "../utils/validations.utils";
import axios from 'axios';

const SF_SECRET = () => process.env.SF_SECRET;
const SF_ID = () => process.env.SF_ID;
const SF_USERNAME = () => process.env.SF_USERNAME;
const SF_PASSWORD = () => process.env.SF_PASSWORD;
const SF_AUTH_URL = () => process.env.SF_AUTH_URL;
const SF_URL = () => process.env.SF_URL;

export const mapArtistToSales = (artist) => ({
  id : artist?.user?.ida, 
  Bairro: artist?.location?.district, 
  CEP: extractNumbers(artist?.location?.zipcode || '') || undefined,
  ConteUmPoucoSobreVoce: (artist?.about || '').slice(0, 255), 
  DataDeCadastro: dateToStringDDMMYYY(artist?.user?.created_at), 
  Logradouro: artist?.location?.address,
  Numero: artist?.location?.number,
  Complemento: artist?.location?.complement,
  Facebook: artist?.facebook,
  Instagram: artist?.instagram,
  NomeSocial: artist?.name,
  PrimeiroNome: artist?.name,
  ProjetoNinja: "SOM", 
  Telefone: artist?.whatsapp, 
  Twitter : artist?.twitter,
  Sobrenome : artist?.name, 
  
  Email : artist?.email,
  EstiloMusical: artist?.musical_styles?.map(m => m?.name).join('; '),
  Integrantes: artist?.integrants?.join('; '),
  
  PaginaSomArtista: artist ? `https://som.vc/artist/${artist?._id}` : '',
  // Pagina500Cidades: '',

  // Cidade: user.productor?.location?.city || user.artist?.location?.city || '',
  Cidade: '',
  // Estado: user.productor?.location?.state || user.artist?.location?.state || '',
  Estado: '',
  // Pais: user.productor?.location?.country || user.artist?.location?.country || '',
  Pais: '',
});

export const mapProducerToSales = (producer) => ({
  id : producer.user.ida, 
  Bairro: producer?.location?.district, 
  CEP: extractNumbers(producer?.location?.zipcode || '') || undefined,
  ConteUmPoucoSobreVoce: producer?.description.slice(0, 255), 
  DataDeCadastro: dateToStringDDMMYYY(producer.user.created_at), 
  Logradouro: producer?.location?.address,
  Numero: producer?.location?.number,
  Complemento: producer?.location?.complement,
  Facebook: producer?.facebook,
  Instagram: producer?.instagram,
  NomeSocial: producer?.name,
  PrimeiroNome: producer?.name,
  ProjetoNinja: "SOM", 
  Telefone: producer?.whatsapp,
  Twitter : producer?.twitter,
  Sobrenome : producer?.name,
  Email : producer?.contact_email,
  PaginaSomProdutor: producer ? `https://som.vc/producer/${producer._id}` : '',
  // Cidade: user.productor?.location?.city || user.artist?.location?.city || '',
  Cidade: '',
  // Estado: user.productor?.location?.state || user.artist?.location?.state || '',
  Estado: '',
  // Pais: user.productor?.location?.country || user.artist?.location?.country || '',
  Pais: '',
});

export const getAuthorization = async () => {
  console.log('🚀 ~ SF_SECRET()', SF_SECRET());
  console.log('🚀 ~ SF_ID()', SF_ID());
  console.log('🚀 ~ SF_USERNAME()', SF_USERNAME());
  console.log('🚀 ~ SF_PASSWORD()', SF_PASSWORD());
  console.log('🚀 ~ SF_AUTH_URL()', SF_AUTH_URL());
  console.log('🚀 ~ SF_URL()', SF_URL());
  const authorization = await axios({
    url: `${SF_AUTH_URL()}/services/oauth2/token?grant_type=password&client_id=${SF_ID()}&client_secret=${SF_SECRET()}&username=${SF_USERNAME()}&password=${SF_PASSWORD()}`,
    method: 'post',
  });
  return {
    token_type: authorization.data.token_type,
    access_token: authorization.data.access_token,
  };
};

export const sendToSalesForce = async (authorization, contact) => {
  try {
    const createdSales = await axios({
      url: `${SF_URL()}/contact`,
      method: 'post',
      headers: {
        Authorization: `${authorization.token_type} ${authorization.access_token}`,
        'Content-Type': 'application/json',
      },
      data: contact,
    });
    return createdSales.data;
  } catch (err) {
    throw err;
  }
}
