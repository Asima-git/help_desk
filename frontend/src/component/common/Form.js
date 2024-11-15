import { useEffect } from 'react'

const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText, hiddenId }) => {
  useEffect(() => {
    if (hiddenId) {
      setFormData((prevData) => ({
        ...prevData,
        ticketId: hiddenId,
      }));
    }
  }, [hiddenId, setFormData]);
  const handleFileChange = (event, name) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      [name]: file, 
    }));
  };
  const renderFields = (getInputControls) => {
    let element = null;
    const value = formData[getInputControls.name] || "";
    switch (getInputControls.componentType) {
      case 'input':
        element = <input type={getInputControls.type} id={getInputControls.name} name={getInputControls.name}
          value={value} onChange={event => setFormData({
            ...formData, [getInputControls.name]: event.target.value
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        break;
      case 'hidden':
        element = <input type={getInputControls.type} id={getInputControls.name} name={getInputControls.name}
          value={hiddenId} />
        break;
      case 'textarea':
        element = <textarea type={getInputControls.type} value={value} onChange={event => setFormData({
          ...formData, [getInputControls.name]: event.target.value
        })} id={getInputControls.name} name={getInputControls.name}
          className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        break;
        case 'file':
          element = (
             <input
            type="file"
            id={getInputControls.name}
            name={getInputControls.name}
            onChange={(event) => handleFileChange(event, getInputControls.name)}
            className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          );
          break;
      case 'select':
        element = <select id={getInputControls.name} name={getInputControls.name} className={`w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
          onChange={event => setFormData({
            ...formData, [getInputControls.name]: event.target.value
          })}
        >
          <option value={value} >Select {getInputControls.label}</option>
          {
            getInputControls.options &&
              getInputControls.options.length > 0 ?
              getInputControls.options.map(optionItem => <option key={optionItem.id} value={optionItem.id}>
                {optionItem.label}
              </option>) : null
          }
        </select>
        break;
      default:
        element = <input type={getInputControls.type} id={getInputControls.name} name={getInputControls.name} className="w-full bg-white rounded border border-gray-300 focus:border-black focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        break;
    }
    return element
  }
  return (
    <>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        {
          formControls.map(controlItem => <div className="relative mb-4" key={controlItem.name}>
            <label className="leading-7 text-sm text-gray-600">{controlItem.label}</label>
            {renderFields(controlItem)}
          </div>)
        }
        <button className="text-white bg-black border-0 py-2 px-8 focus:outline-none hover:bg-slate-500 rounded text-lg">{buttonText || 'Submit'} </button>
      </form>

    </>
  )
}

export default CommonForm
