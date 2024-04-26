const Program = require('../models/program');

exports.approveProgram = async (req, res) => {
    const { programId, editorId } = req.body;

    try {
        const program = await Program.findById(programId);
        if (!program) {
            return res.status(404).json({ message: "Program not found" });
        }

        if (program.status !== 'pending') {
            return res.status(400).json({ message: "Program is not pending approval" });
        }

        program.status = 'approved';
        program.assignedEditor = editorId;
        await program.save();

        res.status(200).json({ message: "Program approved and assigned to editor" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
