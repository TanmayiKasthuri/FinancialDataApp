// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';
// import { Table } from '@tanstack/react-table';

// interface RangeSliderProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
//   table: Table<TData>;
//   revenue: number;
// }

// function valuetext(value: number) {
//   return `${value}°C`;
// }

// export default function RangeSlider<TData>({
//     table,
//   }: RangeSliderProps<TData>) {

//     //const dateColumn = table.getColumn(date);

//     //if (!dateColumn) return null;
    
//   const [value, setValue] = React.useState<number[]>([20, 37]);

//   const handleChange = (event: Event, newValue: number | number[]) => {
//     setValue(newValue as number[]);
//   };

//   return (
//     <Box sx={{ width: 300 }}>
//       <Slider
//         getAriaLabel={() => 'Temperature range'}
//         value={value}
//         onChange={handleChange}
//         valueLabelDisplay="auto"
//         getAriaValueText={valuetext}
//       />
//     </Box>
//   );
// }
