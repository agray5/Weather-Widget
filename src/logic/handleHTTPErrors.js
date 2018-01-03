import Msg from './Msg'

function handleErrors(response){
  if (!response.ok) {
        return new Msg(response.statusText, true);
    }
  return response;
}

export default handleErrors 
