import { Request, Response } from "express";

const Fields = require("../models/fields.model");

// Create a field set for a document
exports.createFields = async (req: Request, res: Response) => {
  const bodyFields = req.body.fields;
  try {
    const fields = new Fields(bodyFields);
    const savedFields = await fields.save();
    res.status(201).json(savedFields);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while creating the fields for document ${req.body.document}`,
    });
  }
};

// Find fields by document
exports.findByDocument = async (req: Request, res: Response) => {
  const document = req.params.document;
  console.log("document:", document);
  try {
    const fields = await Fields.findOne({
      document: document,
    });
    if (!fields) {
      return res
        .status(404)
        .json({ error: `Fields not found for document: ${document}` });
    }
    res.json(fields);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while fetching fields for document: ${document}`,
    });
  }
};

// Find fields by id
exports.findById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const fields = await Fields.findById(id);
    if (!fields) {
      return res.status(404).json({ error: `Fields not found for id: ${id}` });
    }
    res.json(fields);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while fetching fields for id: ${id}`,
    });
  }
};

// Update fields by document
exports.updateByDocument = async (req: Request, res: Response) => {
  const document = req.params.document;
  const fieldUpdates = req.body.fieldUpdates;

  try {
    const updatedFields = await Fields.findOneAndUpdate(
      { document: document },
      fieldUpdates,
      { new: true }
    );
    if (!updatedFields) {
      return res
        .status(404)
        .json({ error: `Fields not found for document: ${document}` });
    }
    res.json(updatedFields);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while updating fields for document: ${document}`,
    });
  }
};

// Update fields by id
exports.updateById = async (req: Request, res: Response) => {
  const id = req.params.id;
  const fieldUpdates = req.body.fieldUpdates;

  try {
    const updatedFields = await Fields.findByIdAndUpdate(id, fieldUpdates, {
      new: true,
    });
    if (!updatedFields) {
      return res.status(404).json({ error: `Fields not found for id: ${id}` });
    }
    res.json(updatedFields);
  } catch (error) {
    res
      .status(500)
      .json({ error: `An error occurred while updating fields for id: ${id}` });
  }
};

// Delete fields by document
exports.deleteByDocument = async (req: Request, res: Response) => {
  const document = req.params.document;

  try {
    const deletedFields = await Fields.findOneAndDelete({ document: document });
    if (!deletedFields) {
      return res
        .status(404)
        .json({ error: `Fields not found for document: ${document}` });
    }
    res.json(deletedFields);
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while deleting fields for document: ${document}`,
    });
  }
};

// Delete fields by id
exports.deleteById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const deletedFields = await Fields.findByIdAndDelete(id);
    if (!deletedFields) {
      return res.status(404).json({ error: `Fields not found for id: ${id}` });
    }
    res.json(deletedFields);
  } catch (error) {
    res
      .status(500)
      .json({ error: `An error occurred while deleting fields for id: ${id}` });
  }
};
