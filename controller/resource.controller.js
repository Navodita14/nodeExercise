const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleware/async");
const {
  getAllResourceService,
  getResourceService,
  createResourceService,
  updateResourceService,
  deleteResourceService,
} = require("../services/resource.services");

//finds all the resources
const getAllResource = asyncWrapper(async (req, res) => {
  const resources = await getAllResourceService();
  if(!resources.length){
    res.status(StatusCodes.NOT_FOUND).send("No resource available")
  }
  res.status(StatusCodes.OK).json(resources);
});

//create new resource
const createResource = asyncWrapper(async (req, res) => {
  const { resource_name, resource_type } = req.body;
  const resources = await createResourceService(resource_name, resource_type);
  res.status(StatusCodes.CREATED).json(resources);
});

//get details of resource by id
const getResource = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const resources = await getResourceService(id);
  if(!resources.length){
    res.status(StatusCodes.NOT_FOUND).send("No such resource")
  }
  res.status(StatusCodes.OK).json(resources);
});

// update the resource by id
const updateResource = asyncWrapper(async (req, res) => {
  const updates = req.body;
  const id = req.params.id;
  //checking if resource exists
  if (!(await getResourceService(id))) {
    res.send("Resource not found");
  }
  const resources = await updateResourceService(id, updates);
  res.status(StatusCodes.OK).json(resources);
});

const deleteResource = asyncWrapper(async (req, res) => {
  if (!(await getResourceService(req.params.id))) {
    res.send("Resource not found");
  }
  const resources = await deleteResourceService(req.params.id);
  res.status(200).json(resources);
});

module.exports = {
  getAllResource,
  getResource,
  updateResource,
  createResource,
  deleteResource,
};
