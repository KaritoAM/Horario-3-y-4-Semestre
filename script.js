// Variables globales
let selectedCourses = {};
let coursesData = [];

const timeSlots = [
    "08:00 - 09:20", "09:30 - 10:50", "11:00 - 12:20", 
    "12:30 - 13:50", "14:30 - 15:50", "16:00 - 17:20",
    "17:30 - 18:50", "19:00 - 20:20"
];
const days = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];

// Función para procesar datos de cursos
function processCourseData(data) {
    const coursesMap = {};
    
    data.forEach(item => {
        const courseName = item.nombre_curso.trim();
        const type = item.tipo.trim();
        
        // Crear una clave única para el curso (nombre + tipo)
        const courseKey = `${courseName}||${type}`;
        
        if (!coursesMap[courseKey]) {
            coursesMap[courseKey] = {
                id: courseKey.toLowerCase().replace(/\s+/g, '-'),
                name: courseName,
                type: type,
                nrcOptions: []
            };
        }
        
        // Buscar si ya existe este NRC
        const nrcOption = coursesMap[courseKey].nrcOptions.find(opt => opt.nrc === item.nrc);
        
        if (nrcOption) {
            // Agregar esta sesión al NRC existente
            nrcOption.schedule.push({
                day: item.dia,
                start: item.hora_inicio,
                end: item.hora_fin,
                classroom: item.sala || 'A definir',
                professor: item.profesor
            });
        } else {
            // Crear nuevo NRC
            coursesMap[courseKey].nrcOptions.push({
                nrc: item.nrc,
                schedule: [{
                    day: item.dia,
                    start: item.hora_inicio,
                    end: item.hora_fin,
                    classroom: item.sala || 'A definir',
                    professor: item.profesor
                }]
            });
        }
    });
    
    return Object.values(coursesMap);
}
const horariosData = [
     {
        "nrc": 5051,
        "nombre_curso": "QCA. ORGÁNICA (LAB) ",
        "dia": "LUNES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Valeria Gazzano",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 5052,
        "nombre_curso": "QCA. ORGÁNICA (LAB) ",
        "dia": "LUNES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Valeria Gazzano",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 5051,
        "nombre_curso": "QCA. ORGÁNICA (LAB) ",
        "dia": "LUNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Valeria Gazzano",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 5052,
        "nombre_curso": "QCA. ORGÁNICA (LAB) ",
        "dia": "LUNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Valeria Gazzano",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9411,
        "nombre_curso": "FISICOQUÍMICA (TEO) ",
        "dia": "LUNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Juan Carlos Santos",
        "tipo": "Teoría"
    },
    {
        "nrc": 9411,
        "nombre_curso": "FISICOQUÍMICA (TEO) ",
        "dia": "MIÉRCOLES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Juan Carlos Santos",
        "tipo": "Teoría"
    },
    {
        "nrc": 26089,
        "nombre_curso": "FISICOQUÍMICA (TEO) ",
        "dia": "MIÉRCOLES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "A definir",
        "tipo": "Teoría"
    },
    {
        "nrc": 12538,
        "nombre_curso": "FISICOQUÍMICA (LAB) ",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9411,
        "nombre_curso": "FISICOQUÍMICA (TEO) ",
        "dia": "JUEVES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Juan Carlos Santos",
        "tipo": "Teoría"
    },
    {
        "nrc": 26089,
        "nombre_curso": "FISICOQUÍMICA (TEO) ",
        "dia": "JUEVES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "A definir",
        "tipo": "Teoría"
    },
    {
        "nrc": 25945,
        "nombre_curso": "FISICOQUÍMICA (LAB) ",
        "dia": "JUEVES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "A definir",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12538,
        "nombre_curso": "FISICOQUÍMICA (LAB) ",
        "dia": "MIÉRCOLES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 25945,
        "nombre_curso": "FISICOQUÍMICA (LAB) ",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "A definir",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 5050,
        "nombre_curso": "QCA. ORGÁNICA (TEO) ",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": ": Andrés Ochoa",
        "tipo": "Teoría"
    },
    {
        "nrc": 5050,
        "nombre_curso": "QCA. ORGÁNICA (TEO) ",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": ": Andrés Ochoa",
        "tipo": "Teoría"
    },
    {
        "nrc": 26089,
        "nombre_curso": "FISICOQUÍMICA (TEO) ",
        "dia": "VIERNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "A definir",
        "tipo": "Teoría"
    },
    {
        "nrc": 9425,
        "nombre_curso": "Organica Avanzada.",
        "dia": "LUNES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Paul Silva",
        "tipo": "Teoría"
    },
    {
        "nrc": 9426,
        "nombre_curso": "Organica Avanzada.",
        "dia": "LUNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Paul Silva",
        "tipo": "Teoría"
    },
    {
        "nrc": 9427,
        "nombre_curso": "Organica Avanzada.",
        "dia": "LUNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Carolina Olea",
        "tipo": "Teoría"
    },
    {
        "nrc": 9343,
        "nombre_curso": "Fisiopatología TEO",
        "dia": "LUNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Yasna Varetto",
        "tipo": "Teoría"
    },
    {
        "nrc": 9413,
        "nombre_curso": "Análisis Instrumental",
        "dia": "LUNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Pamela Espinoza",
        "tipo": "Teoría"
    },
    {
        "nrc": 12539,
        "nombre_curso": "Análisis Instrumental",
        "dia": "MARTES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9344,
        "nombre_curso": "Fisiopatología TEO",
        "dia": "MARTES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Raúl Araneda",
        "tipo": "Teoría"
    },
    {
        "nrc": 12539,
        "nombre_curso": "Análisis Instrumental",
        "dia": "MARTES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9343,
        "nombre_curso": "Fisiopatología TEO",
        "dia": "MARTES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Yasna Varetto",
        "tipo": "Teoría"
    },
    {
        "nrc": 9412,
        "nombre_curso": "Análisis Instrumental",
        "dia": "MARTES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "María Paz Oyarzun",
        "tipo": "Teoría"
    },
    {
        "nrc": 9414,
        "nombre_curso": "Análisis Instrumental",
        "dia": "MARTES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Anita Cataldo",
        "tipo": "Teoría"
    },
    {
        "nrc": 9464,
        "nombre_curso": "Bioquimica General",
        "dia": "MARTES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Claudia Oyanedel",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9461,
        "nombre_curso": "Bioquimica General",
        "dia": "MARTES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Claudia Oyanedel",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9462,
        "nombre_curso": "Bioquimica General",
        "dia": "MARTES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Claudia Oyanedel",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12608,
        "nombre_curso": "HITO INTEGRATIVO ",
        "dia": "MARTES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "A definir",
        "tipo": "Taller"
    },
    {
        "nrc": 9463,
        "nombre_curso": "Bioquimica General",
        "dia": "MARTES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Claudia Oyanedel",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12609,
        "nombre_curso": "HITO INTEGRATIVO  ",
        "dia": "MARTES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "A definir",
        "tipo": "Taller"
    },
    {
        "nrc": 9350,
        "nombre_curso": "Fisiopatología TAL",
        "dia": "LUNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Yasna Varetto",
        "tipo": "Taller"
    },
    {
        "nrc": 9416,
        "nombre_curso": "Análisis Instrumental",
        "dia": "MARTES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12610,
        "nombre_curso": "HITO INTEGRATIVO ",
        "dia": "MARTES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "A definir",
        "tipo": "Taller"
    },
    {
        "nrc": 12746,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MARTES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Manuel Rain",
        "tipo": "Taller"
    },
    {
        "nrc": 12747,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MARTES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Matías Chavez",
        "tipo": "Taller"
    },
    {
        "nrc": 9351,
        "nombre_curso": "Fisiopatología TAL",
        "dia": "LUNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Yasna Varetto",
        "tipo": "Taller"
    },
    {
        "nrc": 9416,
        "nombre_curso": "Análisis Instrumental",
        "dia": "MARTES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Paulina Godoy",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9344,
        "nombre_curso": "Fisiopatología TEO",
        "dia": "LUNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Raúl Araneda",
        "tipo": "Teoría"
    },
    {
        "nrc": 9345,
        "nombre_curso": "Fisiopatología TEO",
        "dia": "LUNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Yasna Varetto",
        "tipo": "Teoría"
    },
    {
        "nrc": 9417,
        "nombre_curso": "Análisis Instrumental",
        "dia": "LUNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Alejandra Molina",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9418,
        "nombre_curso": "Análisis Instrumental",
        "dia": "LUNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "María Paz Oyarzun",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9419,
        "nombre_curso": "Análisis Instrumental",
        "dia": "LUNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Anita Cataldo",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9417,
        "nombre_curso": "Análisis Instrumental",
        "dia": "LUNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Alejandra Molina",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9418,
        "nombre_curso": "Análisis Instrumental",
        "dia": "LUNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "María Paz Oyarzun",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9419,
        "nombre_curso": "Análisis Instrumental",
        "dia": "LUNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Anita Cataldo",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12745,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "LUNES",
        "hora_inicio": "17:30:00",
        "hora_fin": "18:50:00",
        "profesor": "Amaru Aguero",
        "tipo": "Taller"
    },
    {
        "nrc": 9426,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Paul Silva",
        "tipo": "Teoría"
    },
    {
        "nrc": 9425,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Paul Silva",
        "tipo": "Teoría"
    },
    {
        "nrc": 9427,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Carolina Olea",
        "tipo": "Teoría"
    },
    {
        "nrc": 12730,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MIÉRCOLES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Andrés Gonzalez",
        "tipo": "Teoría"
    },
    {
        "nrc": 12732,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Ximena Barros",
        "tipo": "Teoría"
    },
    {
        "nrc": 12734,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Manuel Rain",
        "tipo": "Teoría"
    },
    {
        "nrc": 12730,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MIÉRCOLES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Andrés Gonzalez",
        "tipo": "Teoría"
    },
    {
        "nrc": 12732,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MIÉRCOLES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Ximena Barros",
        "tipo": "Teoría"
    },
    {
        "nrc": 12734,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "MIÉRCOLES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Manuel Rain",
        "tipo": "Teoría"
    },
    {
        "nrc": 9428,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9429,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9428,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9429,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9434,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Carlos Escobar",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9434,
        "nombre_curso": "Organica Avanzada.",
        "dia": "MIÉRCOLES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Carlos Escobar",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9457,
        "nombre_curso": "Bioquimica General",
        "dia": "JUEVES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Claudio Retamal",
        "tipo": "Teoría"
    },
    {
        "nrc": 9458,
        "nombre_curso": "Bioquimica General",
        "dia": "JUEVES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Claudia Oyanedel",
        "tipo": "Teoría"
    },
    {
        "nrc": 9459,
        "nombre_curso": "Bioquimica General",
        "dia": "JUEVES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Tomás Jimenez",
        "tipo": "Teoría"
    },
    {
        "nrc": 9458,
        "nombre_curso": "Bioquimica General",
        "dia": "JUEVES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Claudia Oyanedel",
        "tipo": "Teoría"
    },
    {
        "nrc": 9457,
        "nombre_curso": "Bioquimica General",
        "dia": "JUEVES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Claudio Retamal",
        "tipo": "Teoría"
    },
    {
        "nrc": 9459,
        "nombre_curso": "Bioquimica General",
        "dia": "JUEVES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Tomás Jimenez",
        "tipo": "Teoría"
    },
    {
        "nrc": 9430,
        "nombre_curso": "Organica Avanzada.",
        "dia": "JUEVES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9431,
        "nombre_curso": "Organica Avanzada.",
        "dia": "JUEVES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9430,
        "nombre_curso": "Organica Avanzada.",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9431,
        "nombre_curso": "Organica Avanzada.",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9415,
        "nombre_curso": "Análisis Instrumental",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "María Paz Oyarzun",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9420,
        "nombre_curso": "Análisis Instrumental",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Pamela Espinoza",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9421,
        "nombre_curso": "Análisis Instrumental",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Gabriela Maturana",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9415,
        "nombre_curso": "Análisis Instrumental",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "María Paz Oyarzun",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9420,
        "nombre_curso": "Análisis Instrumental",
        "dia": "JUEVES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Pamela Espinoza",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9421,
        "nombre_curso": "Análisis Instrumental",
        "dia": "JUEVES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Gabriela Maturana",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9460,
        "nombre_curso": "Bioquimica General",
        "dia": "VIERNES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Andrea Soza",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12741,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "VIERNES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Manuel Rain",
        "tipo": "Taller"
    },
    {
        "nrc": 12743,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "VIERNES",
        "hora_inicio": "08:00:00",
        "hora_fin": "09:20:00",
        "profesor": "Francisca Villavicencio",
        "tipo": "Taller"
    },
    {
        "nrc": 9349,
        "nombre_curso": "Fisiopatología TAL",
        "dia": "VIERNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "José Jimenez",
        "tipo": "Taller"
    },
    {
        "nrc": 9432,
        "nombre_curso": "Organica Avanzada.",
        "dia": "VIERNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9433,
        "nombre_curso": "Organica Avanzada.",
        "dia": "VIERNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9432,
        "nombre_curso": "Organica Avanzada.",
        "dia": "VIERNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9433,
        "nombre_curso": "Organica Avanzada.",
        "dia": "VIERNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Paul Silva",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 9465,
        "nombre_curso": "Bioquimica General",
        "dia": "VIERNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Andrea Soza",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12612,
        "nombre_curso": "HITO INTEGRATIVO ",
        "dia": "VIERNES",
        "hora_inicio": "09:30:00",
        "hora_fin": "10:50:00",
        "profesor": "Rodrigo Perez",
        "tipo": "Taller"
    },
    {
        "nrc": 9345,
        "nombre_curso": "Fisiopatología TEO",
        "dia": "JUEVES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Yasna Varetto",
        "tipo": "Teoría"
    },
    {
        "nrc": 9466,
        "nombre_curso": "Bioquimica General",
        "dia": "VIERNES",
        "hora_inicio": "11:00:00",
        "hora_fin": "12:20:00",
        "profesor": "Claudio Retamal",
        "tipo": "Laboratorio"
    },
    {
        "nrc": 12611,
        "nombre_curso": "HITO INTEGRATIVO ",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "A definir",
        "tipo": "Taller"
    },
    {
        "nrc": 12744,
        "nombre_curso": "EPIDEMIOLOGÍA",
        "dia": "JUEVES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Cecilia Reyes",
        "tipo": "Taller"
    },
    {
        "nrc": 9348,
        "nombre_curso": "Fisiopatología TAL",
        "dia": "JUEVES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Yasna Varetto",
        "tipo": "Taller"
    },
    {
        "nrc": 9346,
        "nombre_curso": "Fisiopatología TAL",
        "dia": "JUEVES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Yasna Varetto",
        "tipo": "Taller"
    },
    {
        "nrc": 9347,
        "nombre_curso": "Fisiopatología TAL",
        "dia": "VIERNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Raúl Araneda",
        "tipo": "Taller"
    },
    {
        "nrc": 9457,
        "nombre_curso": "Bioquimica General",
        "dia": "VIERNES",
        "hora_inicio": "12:30:00",
        "hora_fin": "13:50:00",
        "profesor": "Claudio Retamal",
        "tipo": "Teoría"
    },
    {
        "nrc": 9458,
        "nombre_curso": "Bioquimica General",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Claudia Oyanedel",
        "tipo": "Teoría"
    },
    {
        "nrc": 9459,
        "nombre_curso": "Bioquimica General",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "Tomás Jimenez",
        "tipo": "Teoría"
    },
    {
        "nrc": 9412,
        "nombre_curso": "Análisis Instrumental",
        "dia": "VIERNES",
        "hora_inicio": "14:30:00",
        "hora_fin": "15:50:00",
        "profesor": "María Paz Oyarzun",
        "tipo": "Teoría"
    },
    {
        "nrc": 9413,
        "nombre_curso": "Análisis Instrumental",
        "dia": "VIERNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Pamela Espinoza",
        "tipo": "Teoría"
    },
    {
        "nrc": 9414,
        "nombre_curso": "Análisis Instrumental",
        "dia": "VIERNES",
        "hora_inicio": "16:00:00",
        "hora_fin": "17:20:00",
        "profesor": "Anita Cataldo",
        "tipo": "Teoría"
    }
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Procesar datos
        coursesData = processCourseData(horariosData);
        
        // Generar interfaz
        generateScheduleGrid();
        renderCourses();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('courses-container').innerHTML = `
            <div class="error">
                <strong>Error al procesar los datos:</strong><br>
                ${error.message}
            </div>
        `;
    }
});

// Generar la cuadrícula del horario
function generateScheduleGrid() {
    const grid = document.getElementById('schedule-grid');
    grid.innerHTML = '';
    
    // Celda vacía en la esquina superior izquierda
    grid.appendChild(createElement('div', 'time-slot', ''));
    
    // Encabezados de días
    days.forEach(day => {
        const dayHeader = createElement('div', 'day-header');
        dayHeader.textContent = day;
        grid.appendChild(dayHeader);
    });
    
    // Filas de horas
    timeSlots.forEach((slot, index) => {
        // Columna de hora
        const timeSlot = createElement('div', 'time-slot');
        timeSlot.textContent = slot;
        grid.appendChild(timeSlot);
        
        // Celdas para cada día
        days.forEach(day => {
            const hourCell = createElement('div', 'hour-slot');
            hourCell.dataset.day = day;
            hourCell.dataset.timeIndex = index;
            grid.appendChild(hourCell);
        });
    });
}

// Renderizar cursos disponibles
function renderCourses() {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';
    
    if (coursesData.length === 0) {
        container.innerHTML = '<div class="error">No se encontraron cursos disponibles</div>';
        return;
    }
    
    coursesData.forEach(course => {
        const card = createElement('div', 'course-card');
        card.innerHTML = `
            <h3>${course.name} <span class="course-type">(${course.type})</span></h3>
            <div class="nrc-options"></div>
        `;
        
        const nrcContainer = card.querySelector('.nrc-options');
        
        if (course.nrcOptions.length === 0) {
            nrcContainer.innerHTML = '<div>No hay secciones disponibles</div>';
        } else {
            course.nrcOptions.forEach(nrcOption => {
                const nrcEl = createElement('div', 'nrc-option');
                nrcEl.innerHTML = `
                    <input type="checkbox" id="${course.id}-${nrcOption.nrc}">
                    <label for="${course.id}-${nrcOption.nrc}">NRC ${nrcOption.nrc}</label>
                `;
                
                const checkbox = nrcEl.querySelector('input');
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        selectNrc(course, nrcOption);
                    } else {
                        deselectNrc(course.id, nrcOption.nrc);
                    }
                });
                
                nrcContainer.appendChild(nrcEl);
            });
        }
        
        container.appendChild(card);
    });
}

// Seleccionar un NRC específico
function selectNrc(course, nrcOption) {
    const selectionKey = `${course.id}-${nrcOption.nrc}`;
    
    // Solo agregar si no está ya seleccionado
    if (!selectedCourses[selectionKey]) {
        selectedCourses[selectionKey] = {
            courseId: course.id,
            name: course.name,
            type: course.type,
            nrc: nrcOption.nrc,
            schedule: [...nrcOption.schedule]
        };
        
        // Actualizar UI
        updateCourseSelectionUI();
        updateScheduleGrid();
        checkConflicts();
        
        // Marcar como seleccionado
        const option = document.querySelector(`.nrc-option input[id="${course.id}-${nrcOption.nrc}"]`);
        if (option) {
            option.parentElement.classList.add('selected');
        }
    }
}

// Deseleccionar un NRC
function deselectNrc(courseId, nrc) {
    const selectionKey = `${courseId}-${nrc}`;
    
    if (selectedCourses[selectionKey]) {
        delete selectedCourses[selectionKey];
        
        // Actualizar UI
        updateCourseSelectionUI();
        updateScheduleGrid();
        checkConflicts();
        
        // Desmarcar selección
        const option = document.querySelector(`.nrc-option input[id="${courseId}-${nrc}"]`);
        if (option) {
            option.parentElement.classList.remove('selected');
        }
    }
}

// Actualizar la UI de selección de cursos
function updateCourseSelectionUI() {
    const container = document.getElementById('selected-courses');
    container.innerHTML = '';
    
    // Agrupar por curso
    const groupedCourses = {};
    Object.values(selectedCourses).forEach(course => {
        if (!groupedCourses[course.name]) {
            groupedCourses[course.name] = [];
        }
        groupedCourses[course.name].push(course);
    });
    
    // Mostrar cursos agrupados
    Object.keys(groupedCourses).forEach(courseName => {
        const group = groupedCourses[courseName];
        const groupEl = createElement('div', 'course-group');
        groupEl.innerHTML = `<h3>${courseName}</h3>`;
        
        group.forEach(course => {
            const courseEl = createElement('div', 'selected-course');
            courseEl.innerHTML = `
                <button class="remove-btn" data-course-id="${course.courseId}" data-nrc="${course.nrc}">×</button>
                <div class="course-info">
                    <strong>NRC: ${course.nrc} (${course.type})</strong><br>
                    ${course.schedule.map(s => `
                        ${s.day}: ${s.start}-${s.end}<br>
                        ${s.classroom} - ${s.professor}
                    `).join('<br>')}
                </div>
            `;
            groupEl.appendChild(courseEl);
        });
        
        container.appendChild(groupEl);
    });
    
    // Agregar eventos para eliminar
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const courseId = btn.dataset.courseId;
            const nrc = btn.dataset.nrc;
            deselectNrc(courseId, nrc);
            // También desmarcar el checkbox
            const checkbox = document.getElementById(`${courseId}-${nrc}`);
            if(checkbox) checkbox.checked = false;
        });
    });
}

// Actualizar la cuadrícula del horario con las clases seleccionadas
function updateScheduleGrid() {
    // Limpiar horario
    document.querySelectorAll('.hour-slot').forEach(slot => {
        slot.innerHTML = '';
    });
    
    // Agregar bloques de clase
    Object.values(selectedCourses).forEach(course => {
        course.schedule.forEach(session => {
            const day = session.day;
            const startTime = session.start;
            const endTime = session.end;
            
            // Encontrar el slot correcto
            const timeIndex = timeSlots.findIndex(slot => {
                // Extraer solo la hora de inicio (parte antes del '-')
                const slotStart = slot.split(' - ')[0].trim();
                // Normalizar formato de hora (asegurar dos dígitos)
                const normalizedSlotStart = normalizeTime(slotStart);
                const normalizedStartTime = normalizeTime(startTime);
                
                return normalizedSlotStart === normalizedStartTime;
            });
            
            if (timeIndex !== -1) {
                const slotSelector = `.hour-slot[data-day="${day}"][data-time-index="${timeIndex}"]`;
                const slot = document.querySelector(slotSelector);
                
                if (slot) {
                    const classBlock = createElement('div', 'class-block');
                    classBlock.classList.add(getTypeClass(course.type));
                    
                    // Crear contenido para el bloque
                    classBlock.innerHTML = `
                        <div class="course-name">${course.name}</div>
                        <div class="details">${startTime}-${endTime}</div>
                        <div class="details">${course.nrc} (${course.type})</div>
                        <div class="details">${session.professor}</div>
                    `;
                    
                    slot.appendChild(classBlock);
                }
            }
        });
    });
}

// Normalizar formato de hora (asegurar HH:MM)
function normalizeTime(timeStr) {
    // Eliminar espacios y separadores innecesarios
    let cleanTime = timeStr.replace(/\s/g, '').replace(/[^0-9:]/g, '');
    
    // Si tiene formato HHMM (sin dos puntos)
    if (cleanTime.length === 4 && !cleanTime.includes(':')) {
        return cleanTime.substring(0, 2) + ':' + cleanTime.substring(2);
    }
    
    // Asegurar dos dígitos para horas de un solo dígito
    if (cleanTime.length === 4 && cleanTime.includes(':')) {
        const [hours, minutes] = cleanTime.split(':');
        return hours.padStart(2, '0') + ':' + minutes;
    }
    
    // Si ya viene con segundos (HH:MM:SS), quitarlos
    if (cleanTime.split(':').length === 3) {
        const [hours, minutes] = cleanTime.split(':');
        return hours.padStart(2, '0') + ':' + minutes;
    }
    
    return cleanTime;
}

// Verificar conflictos de horario
function checkConflicts() {
    const conflictWarning = document.getElementById('conflict-warning');
    conflictWarning.textContent = '';
    conflictWarning.classList.remove('active');
    
    const timeMap = {};
    let conflicts = [];
    
    // Recorrer todos los cursos seleccionados
    Object.values(selectedCourses).forEach(course => {
        course.schedule.forEach(session => {
            const key = `${session.day}-${normalizeTime(session.start)}`;
            
            if (!timeMap[key]) {
                timeMap[key] = [];
            }
            
            timeMap[key].push(`${course.name} (${course.nrc})`);
        });
    });
    
    // Verificar conflictos
    Object.keys(timeMap).forEach(key => {
        if (timeMap[key].length > 1) {
            const [day, start] = key.split('-');
            conflicts.push({
                day: day,
                time: start,
                courses: timeMap[key]
            });
            
            // Resaltar bloques en conflicto
            const timeIndex = timeSlots.findIndex(slot => {
                const slotStart = slot.split(' - ')[0].trim();
                return normalizeTime(slotStart) === start;
            });
            
            if (timeIndex !== -1) {
                const slotSelector = `.hour-slot[data-day="${day}"][data-time-index="${timeIndex}"]`;
                const slot = document.querySelector(slotSelector);
                
                if (slot) {
                    slot.querySelectorAll('.class-block').forEach(block => {
                        block.classList.add('conflict');
                    });
                }
            }
        }
    });
    
    if (conflicts.length > 0) {
        conflictWarning.classList.add('active');
        conflictWarning.innerHTML = '<strong>Conflictos de horario detectados:</strong><br>';
        
        conflicts.forEach(conflict => {
            conflictWarning.innerHTML += `- ${conflict.day} ${conflict.time}: ${conflict.courses.join(' / ')}<br>`;
        });
    }
}

// Función auxiliar para crear elementos
function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
}

// Obtener clase CSS según el tipo de curso
function getTypeClass(type) {
    const typeLower = type.toLowerCase();
    if (typeLower.includes('teoría') || typeLower.includes('teo')) return 'teoria';
    if (typeLower.includes('laboratorio') || typeLower.includes('lab')) return 'laboratorio';
    if (typeLower.includes('taller') || typeLower.includes('tal')) return 'taller';
    if (typeLower.includes('simulación') || typeLower.includes('sim')) return 'simulacion';
    return 'teoria';
}
