async function getDocuments(prisma, res) {
  try {
    const posts = await prisma.document.findMany();

    if (posts.empty) {
      prisma.$disconnect();
      console.log("Document list is empty!");
      return res.status(200).json({});
    }

    prisma.$disconnect();
    console.log("Documents retrieved successfully!");

    return res.status(200).json({
      data: posts.map((doc) => ({
        id: doc.id,
        name: doc.name,
        emittor: doc.emittor,
        attr_value: doc.attr_value,
        liquid_value: doc.liquid_value,
        document_type: doc.document_type,
        document_origin: doc.document_origin,
        updated_at: doc.updated_at,
        created_at: doc.created_at,
      })),
    });
  } catch (error) {
    prisma.$disconnect();
    console.error("Error getting documents: ", error);
  }
}

async function getDocument(prisma, req, res) {
  const id = req.params.id;

  if (!id) {
    prisma.$disconnect();
    console.error("Missing required fields!");
    return res.status(500).json({ error: "Missing required fields!" });
  }

  try {
    const document = await prisma.document.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!document) {
      prisma.$disconnect();
      console.error("Document not found!");
      return res.status(500).json({ error: "Document not found!" });
    }

    prisma.$disconnect();
    console.log("Document retrieved successfully!");
    return res.status(200).json({
      data: document,
    });
  } catch (error) {
    prisma.$disconnect();
    console.error("Error getting document:", error);
  }
}

async function saveDocument(prisma, req, res) {
  if (!req.body.id && !req.body.name && !req.file) {
    prisma.$disconnect();
    console.error("Missing required fields!");
    return res.status(500).json({ error: "Missing required fields." });
  }

  req.body.name = req.file.filename;
  req.body.created_at = new Date();
  req.body.updated_at = new Date();

  try {
    const post = await prisma.document.create({
      data: req.body,
    });

    console.log("Document added successfully!");
    prisma.$disconnect();

    return res.status(200).json({ message: "Document added successfully!" });
  } catch (error) {
    prisma.$disconnect();
    console.error("Error saving document: ", error);
    return {
      success: false,
      message: `Error saving document: ${error.message}`,
    };
  }
}

async function deleteDocument(prisma, req, res) {
  const id = req.params.id;

  if (!id) {
    prisma.$disconnect();
    console.error("Missing required fields!");
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const document = await prisma.document.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!document) {
      prisma.$disconnect();
      console.error("Document not found!");
      return res.status(500).json({ error: "Document not found!" });
    }

    const filePath = "./files/" + docSnapshot.data().name;

    fs.access(filePath, fs.constants.F_OK, (err) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          prisma.$disconnect();
          return res
            .status(500)
            .json({ error: `Error deleting document: ${err.message}` });
        } else {
          const deletedDocument = prisma.document.delete({
            where: {
              id: id,
            },
          });

          prisma.document.findMany().then((documents) => {
            console.log("Document deleted successfully!");
            prisma.$disconnect();

            return res.status(200).json({
              data: documents.map((doc) => ({
                id: doc.id,
                name: doc.name,
                emittor: doc.emittor,
                attr_value: doc.attr_value,
                liquid_value: doc.liquid_value,
                updated_at: doc.updated_at,
                created_at: doc.created_at,
              })),
            });
          });
        }
      });
    });
  } catch (error) {
    prisma.$disconnect();
    console.error("Error deleting document: ", error);
  }
}

module.exports = {
  getDocuments,
  getDocument,
  saveDocument,
  deleteDocument,
};
