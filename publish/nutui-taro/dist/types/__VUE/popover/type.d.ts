import { Component } from 'vue';
export type PopoverTheme = 'light' | 'dark';
export type PopoverLocation = 'bottom' | 'top' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
export type PopoverList = {
    name: string;
    icon?: Component;
    disabled?: boolean;
    className?: any;
    [key: PropertyKey]: any;
};
