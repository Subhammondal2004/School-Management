import type { Request, Response } from "express";
import pool from "../config/db.js";
import { calculateDistance } from "../utils/distance.js";

const addSchool = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, address, latitude, longitude } = req.body;
    if (
      !name ||
      !address ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const [result]: any = await pool.query(
      `
      INSERT INTO schools
      (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
      `,
      [name, address, latitude, longitude]
    );

    const [rows]: any = await pool.query(
      `SELECT * FROM schools WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      data: rows[0],
      message: "New School added successfully!",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const listSchools = async (
  req: Request,
  res: Response
) => {
  try {
    const userLatitude = Number(
      req.query.latitude
    );

    const userLongitude = Number(
      req.query.longitude
    );

    if (
      isNaN(userLatitude) ||
      isNaN(userLongitude)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid latitude and longitude are required",
      });
    }

    const [schools]: any = await pool.query(
      `SELECT * FROM schools`
    );

    const schoolsWithDistance = schools.map(
      (school: any) => {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distanceInKm: Number(
            distance.toFixed(2)
          ),
        };
      }
    );

    schoolsWithDistance.sort(
      (a: any, b: any) =>
        a.distanceInKm - b.distanceInKm
    );

    return res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addSchool,
  listSchools,
};