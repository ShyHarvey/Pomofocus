'use client'
import React, { useRef } from 'react'
import { ThemeSelect } from '@/components/options/themeSelect'
import { TimingOptions } from '@/components/options/TimingOptions'
import { AutoStartOptions } from '@/components/options/AutoStartOptions'
import { SoundOptions } from './SoundOptions'

export const OptionsModal = ({

}: {

    }) => {

    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <>
            <button className="btn btn-sm" onClick={openModal}>options</button>
            <dialog ref={modalRef} className="max-w-full modal ">
                <div className="max-w-sm modal-box bg-accent">
                    <h3 className="text-lg font-bold text-accent-content ">Options</h3>
                    <ThemeSelect />
                    <TimingOptions />
                    <AutoStartOptions />
                    <SoundOptions />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className='modal-backdrop'>
                    <button>Close</button>
                </form>
            </dialog>
        </>
    )
}