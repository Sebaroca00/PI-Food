

const getRecipesHandler = ( req, res) => {
    const { name } = req.query;
    if(name !== undefined) {
        res.send(`${name}`)
    } else {
        res.send("otra cosa")
    }
};

const getRecipesIdHandler = ( req, res) => {
    const {id} = req.params
    res.send(`${id}`)
};
   
const postRecipesHandler = async (req,res,next) => {
    let {
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        createdInDb,
        typeDiets
    } = req.body;
    if(!title || !summary) {
        return res.status(400).send('Please, insert a title and a summary to continue!');
    }}
   
module.exports = {
    getRecipesHandler,
    getRecipesIdHandler,
    postRecipesHandler 

}