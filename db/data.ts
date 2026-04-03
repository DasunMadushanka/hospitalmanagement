//all channels data matches schema.ts structure
export const allChannels = [
    {
        speciality: "Cardiology",
        doctorname: "Dr. John Doe",
        doctorid: "1",
        dateforchannel: "2026-03-11",
        timeforchannel: "10:00 AM",
        description: "Cardiology channel",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),//1 days ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),//1 day ago
        deletedAt: null,
        isDeleted: false,
        userId: "1",
        username: "John Doe",
        useremail: "john.doe@example.com",
        userphone: "1234567890",
        status: "Pending",
    },
    {
        speciality: "Cardiology",
        doctorname: "Dr. John Doe",
        doctorid: "1",
        dateforchannel: "2026-03-11",
        timeforchannel: "10:00 AM",
        description: "Cardiology channel",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),//1 days ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),//1 day ago
        deletedAt: null,
        isDeleted: false,
        userId: "2",
        username: "Jane Smith",
        useremail: "jane.smith@example.com",
        userphone: "0987654321",
        status: "Pending",
    },
    {
        speciality: "Ayurveda",
        doctorname: "Dr. Kamal Kumar",
        doctorid: "2",
        dateforchannel: "2026-03-11",
        timeforchannel: "10:00 AM",
        description: "Ayurveda channel",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),//1 days ago
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),//1 day ago
        deletedAt: null,
        isDeleted: false,
        userId: "1",
        username: "John Doe",
        useremail: "john.doe@example.com",
        userphone: "1234567890",
        status: "Pending",
    },
];