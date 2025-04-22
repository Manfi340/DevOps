const getConsultantTest = async (req, res) =>{
    res.send("consultant route works");
}

const addConsultant = async (req, res) => {
    res.send("Consultant added successfully");
};

const getAllConsultants = async (req, res) => {
    res.send("Fetched all consultants");
};

const getConsultantById = async (req, res) => {
    res.send(`Consultant details for ID ${req.params.id}`);
};

const updateConsultant = async (req, res) => {
    res.send(`Consultant ${req.params.id} updated`);
};

const deleteConsultant = async (req, res) => {
    res.send(`Consultant ${req.params.id} deleted`);
};

  
module.exports = { addConsultant, getAllConsultants, getConsultantById, updateConsultant, deleteConsultant, getConsultantTest }; 