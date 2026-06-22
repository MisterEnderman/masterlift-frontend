export const plans = [
    {
        id: 2001,
        title: 'Sunday - Chest, Shoulders, Biceps',
        desc: '',
        exerciseIds: [],
        isFavorite: true,
        likes: 45,
        createdAt: new Date('2026-03-02')
    },
    {
        id: 2002,
        title: 'Tuesday - Back, Triceps, Abs',
        desc: '',
        exerciseIds: [],
        isFavorite: true,
        likes: 39,
        createdAt: new Date('2026-03-02')
    },
    {
        id: 2003,
        title: 'Thursday - Legs, Cardio',
        desc: '',
        exerciseIds: [],
        isFavorite: false,
        likes: 57,
        createdAt: new Date('2026-03-02')
    }
]

export const exercises = [
    {
        id: 1001,
        title: 'Bench Press',
        desc: 'תרגיל לחיצת חזה בשכיבה כנגד מוט, המיועד לבניית כוח ומסה בפלג הגוף העליון.',
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueXF4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxx6r76EshO/giphy.gif',
        targetMuscles: ['Chest'],
        secondaryMuscles: ['Triceps', 'Front Deltoids']
    },
    {
        id: 1002,
        title: 'Squat',
        desc: 'תרגיל בסיס לרגליים המערב את כל שרשרת השרירים האחורית והקדמית.',
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHJueXF4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/xT8qB308S6mCQWMpS8/giphy.gif',
        targetMuscles: ['Quadriceps'],
        secondaryMuscles: ['Glutes', 'Hamstrings', 'Lower Back']
    },
    {
        id: 1003,
        title: 'Deadlift',
        desc: 'תרגיל הרמת משקל מהרצפה, מחזק משמעותית את הגב, הרגליים והאחיזה.',
        gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHJueXF4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4ZzR4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l3vR8IAt21ItxAzG8/giphy.gif',
        targetMuscles: ['Lower Back', 'Hamstrings'],
        secondaryMuscles: ['Glutes', 'Traps', 'Forearms']
    },
    {
        id: 1004,
        title: 'Pull-Ups',
        desc: 'מתח - תרגיל משקל גוף מצוין לרוחב הגב ולדו-ראשי.',
        gif: '',
        targetMuscles: ['Lats'],
        secondaryMuscles: ['Biceps', 'Rear Deltoids']
    },
    {
        id: 1005,
        title: 'Overhead Press',
        desc: 'לחיצת כתפיים בעמידה כנגד מוט לפיתוח כתפיים חזקות ויציבות.',
        gif: '',
        targetMuscles: ['Shoulders'],
        secondaryMuscles: ['Triceps', 'Upper Chest']
    },
    {
        id: 1006,
        title: 'Barbell Row',
        desc: 'חתירה כנגד מוט לחיזוק עובי הגב ושיפור היציבה.',
        gif: '',
        targetMuscles: ['Middle Back'],
        secondaryMuscles: ['Biceps', 'Lats']
    },
    {
        id: 1007,
        title: 'Lunge',
        desc: 'מכרעים - תרגיל מצוין לעבודה על שיווי משקל וחיזוק כל רגל בנפרד.',
        gif: '',
        targetMuscles: ['Quadriceps', 'Glutes'],
        secondaryMuscles: ['Hamstrings', 'Core']
    },
    {
        id: 1008,
        title: 'Dips',
        desc: 'מקבילים - תרגיל דחיפה חזק מאוד ליד האחורית ולחזה התחתון.',
        gif: '',
        targetMuscles: ['Triceps'],
        secondaryMuscles: ['Chest', 'Shoulders']
    },
    {
        id: 1009,
        title: 'Plank',
        desc: 'תרגיל סטטי לחיזוק שרירי הליבה והיציבה הכללית.',
        gif: '',
        targetMuscles: ['Abs', 'Core'],
        secondaryMuscles: ['Shoulders', 'Lower Back']
    },
    {
        id: 1010,
        title: 'Bicep Curl',
        desc: 'כפיפת מרפקים כנגד משקולות יד לבידוד שריר הזרוע הדו-ראשי.',
        gif: '',
        targetMuscles: ['Biceps'],
        secondaryMuscles: ['Forearms']
    }
];