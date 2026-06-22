import React, { useState, useEffect } from 'react';

// --- 1. קומפוננטה חכמה לטעינת התמונה המוגנת של ה-API ---
const ExerciseImage = ({ exerciseId, alt, apiKey }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        const loadImage = async () => {
            try {
                setImgLoading(true);
                const response = await fetch(`https://exercisedb.p.rapidapi.com/image?exerciseId=${exerciseId}&resolution=180`, {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': apiKey,
                        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                    }
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    setImageSrc(objectURL);
                } else {
                    console.error(`Failed to load image for ID ${exerciseId}: ${response.status}`);
                }
            } catch (err) {
                console.error("Error loading image:", err);
            } finally {
                setImgLoading(false);
            }
        };

        if (exerciseId) {
            loadImage();
        }

        // Clean up ה-URL מהזיכרון כשהקומפוננטה נסגרת
        return () => {
            if (imageSrc) URL.revokeObjectURL(imageSrc);
        };
    }, [exerciseId, apiKey]);

    if (imgLoading) return <div style={{ fontSize: '11px', color: '#999', margin: '20px 0' }}>Loading image...</div>;
    if (!imageSrc) return <div style={{ fontSize: '11px', color: 'red', margin: '20px 0' }}>Image unavailable</div>;

    return (
        <img
            src={imageSrc}
            alt={alt}
            style={{
                width: '100%',
                maxWidth: '150px',
                height: 'auto',
                display: 'block',
                margin: '10px auto 0 auto',
                borderRadius: '6px'
            }}
        />
    );
};

export default ExerciseImage;