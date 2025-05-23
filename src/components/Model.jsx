import { useGSAP } from '@gsap/react'
import React, { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ModelView from './ModelView'
import * as THREE from 'three'
import { yellowImg } from '../utils'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { models, sizes } from "../constants";


const Model = () => {
    const [size, setSize] = useState('small');
    const [model, setModel] = useState({
        title: 'Iphone 15 Pro in Natural Titanium',
        color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg,
    });

    // Camera Control refs
    const cameraControlSmall = useRef(null);
    const cameraControlLarge = useRef(null);

    // Model refs
    const small = useRef(null);
    const large = useRef(null);

    // Initialize Three.js groups
    useLayoutEffect(() => {
        small.current = new THREE.Group();
        large.current = new THREE.Group();
    }, []);

    // Rotation states
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    useGSAP(() => {
        gsap.to('#heading', { y: 0, opacity: 1 })
    }, []);

    return (
        <section className='common-padding'>
            <div className='screen-max-width'>
                <h1 id='heading' className='section-heading'>
                    Take a closer look.
                </h1>
                <div className='flex flex-col items-center mt-5'>
                    <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />

                        <Canvas
                            className='w-full h-full'
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden'
                            }}
                            eventSource={document.getElementById('root')}
                        >
                            <View.Port/>
                        </Canvas>
                    </div>
                    <div className='mx-auto w-full'>
                        <p className='text-sm font-light text-center mb-5'>{model.title}</p>
                        <div className='flex-center'>
                            <ul className='color-container'>
                                {models.map((item, i) => {
                                    
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Model;