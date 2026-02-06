import { prisma } from "../config/db.js";

const getAddress = async(req, res) => {
    try {
        const address = await prisma.address.findMany({
            where: {userId: req.user.id},
            orderBy: {isDefault: 'desc'}
        });

        res.status(200).json({status: 200, address});
    } catch (error) {
        res.status(500).json({status: 500, message: "Failed to retrive the address", error});
    }
};

const addAddress = async(req, res) => {
    const {fullname, phone, line1, line2, city, state, country, pincode, isDefault} = req.body;

    try {
        if(isDefault){
            await prisma.address.updateMany({
                where: {userId: req.user.id},
                data: {isDefault: false}
            });
        }

        const newAddress = await prisma.address.create({
            data: {
                fullname, phone, line1, line2, city, state, country, pincode, 
                isDefault: isDefault || false, 
                userId: req.user.id, 
            }
        });

        res.status(201).json({status: 201, newAddress});
    } catch (error) {
        res.status(400).json({ message: "Failed to create address", error });
    }
}

const updateAddress = async(req, res) => {
    const { id } = req.params;
    const {fullname, phone, line1, line2, city, state, country, pincode} = req.body;

    const data = {};

if (fullname !== undefined) data.fullname = fullname;
if (phone !== undefined) data.phone = phone;
if (line1 !== undefined) data.line1 = line1;
if (line2 !== undefined) data.line2 = line2;
if (city !== undefined) data.city = city;
if (state !== undefined) data.state = state;
if (country !== undefined) data.country = country;
if (pincode !== undefined) data.pincode = pincode;

if (Object.keys(data).length === 0) {
  return res.status(400).json({ error: "No fields provided to update" });
}

    try {
        // ensure the address belongs to the user before deleting
        const address = await prisma.address.findUnique({where: { id }});

        if(!address || address.userId !== req.user.id){
            return res.status(403).json({status: 403, message: "Unauthorized to update the address"})
        }

        await prisma.address.update({ 
            where: { id },
            data 
        });
        res.status(200).json({message: "Address updated Successfully"});
    } catch (error) {
        res.status(500).json({status: 500, message: "Error updating address", error});
    }
};

const deleteAddress = async(req, res) => {
    const { id } = req.params;

    try {
        // ensure the address belongs to the user before deleting
        const address = await prisma.address.findUnique({where: { id }});

        if(!address || address.userId !== req.user.id){
            return res.status(403).json({status: 403, message: "Unauthorized to delete this address"})
        }

        await prisma.address.delete({ where: { id }});
        res.status(200).json({message: "Address removed Successfully"});
    } catch (error) {
        res.status(500).json({status: 500, message: "Error deleting address", error});
    }
};


export {getAddress, addAddress, updateAddress, deleteAddress};