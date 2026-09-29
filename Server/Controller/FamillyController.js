import Family from "../Models/FamilyModel.js";

export const CreateFamily = async (req, res) => {
    try {
        console.log(req.user);
        const { familyName, rootPerson } = req.body;

        if (!familyName) {
            return res.status(400).json({
                success: false,
                message: "Family name is required"
            });
        }

        if (!rootPerson) {
            return res.status(400).json({
                success: false,
                message: "Root person is required"
            });
        }

        const family = await Family.create({
            userId: req.user._id,
            familyName,
            rootPerson
        });


        res.status(201).json({
            success: true,
            message: "Family created successfully",
            family
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

export const findFamilies = async (req, res) => {
    try {
        console.log(req.user);
        const families = await Family.find({ userId: req.user._id });
        console.log(families)
        res.send(families)
    } catch (error) {
        res.send(error)
    }

}
