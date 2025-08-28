const{ getAllResourceService, getResourceService, createResourceService, updateResourceService, deleteResourceService} = require('../services/resource.services')

const getAllResource = async (req, res) => {
    try {
        const resources= await getAllResourceService();
        res.status(200).json(resources)
    } catch (error) {
        res.status(400).json({err:error})
    }
};
const createResource = async (req, res) => {
    try {
        const {resource_name, resource_type}= req.body
        const resources= await createResourceService(resource_name,resource_type);
        res.status(201).json(resources)
    } catch (error) {
        res.status(400).json({err:error})
    }
};
const getResource = async (req, res) => {
    try {
        const id= req.params.id;
        const resources= await getResourceService(id)
        res.status(200).json(resources)
        
    } catch (error) {
        res.status(400).json({err:error})
    }
};
const updateResource = async (req, res) => {
    try {
        const updates= req.body
        const id= req.params.id
        const resources= await updateResourceService(id, updates)
        res.status(200).json(resources)
        
    } catch (error) {
        res.status(400).json({err:error})
    }
};
const deleteResource = async (req, res) => {
    try {
        const resources= await deleteResourceService(req.params.id)
        res.status(200).json(resources)
    } catch (error) {
        res.status(400).json({err:error})
    }
};

module.exports = {
  getAllResource,
  getResource,
  updateResource,
  createResource,
  deleteResource,
};
