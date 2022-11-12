'use strict';

import { useCallback, useMemo, useEffect, useState, useRef } from 'react';
import { Button, Group, Loader, LoadingOverlay, Text, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  SelectionChangedEvent,
  FirstDataRenderedEvent
} from 'ag-grid-community';
import { Employee } from '../interfaces/Employee';
import '../styles/datatable.css';
import { useEmployee } from '../hooks/useEmployee';
import LoadingOverlayComp from './LoadingOVerlayComp';
import ConfirmationDialog from './ConfirmationDialog';

const formatDate = (inputDate: Date) => {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

  return `${date}/${month}/${year}`;
}

const filterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: Date) => {
    const dateAsString = formatDate(cellValue);
    if (dateAsString == null) return -1;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

const filterParamsVac = {
  filterOptions: ['contains'],
};


const equalStringComparator = (filter: string, value: string) => {
  const newFilter = filter == 'Yes' ? 'true' : 'false';
  if (newFilter === null || filter === undefined || filter === '') {
    return 0;
  }
  if (newFilter === null || value === undefined) {
    return -1;
  }
  if (value.toString().toLowerCase().indexOf(newFilter.toString().toLowerCase()) >= 0) {
    return 0;
  }
  return -1;
};

const Datatable = () => {
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const { employees, loading, getAllEmployees, deleteEmployees } = useEmployee()
  const [showDelete, setShowDelete] = useState(false)
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const [opened, setOpened] = useState(false);

  const gridRef = useRef<AgGridReact<Employee>>(null);


  const containerStyle = useMemo(() => ({ width: '100%', height: '90%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [rowEmployeeData, setRowEmployeeData] = useState<Employee[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'email',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      minWidth: 200,
    },
    { field: 'id' },
    {
      field: 'vac',
      headerName: 'Vaccinated',
      cellRenderer: (params: any) => {
        return params.value ? 'True' : 'False';
      },
      filterParams: filterParamsVac
    },
    {
      field: 'vacbrand',
      headerName: 'Vaccine brand',
    },
    {
      field: 'vacdate',
      headerName: 'Vaccine date',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
      cellRenderer: (params: any) => {
        if(params.value) {
          return formatDate(params.value)
        } else {
          return ''
        }
      },
    },
    {
      field: 'doses',
      headerName: 'Dose No.',
    },
    { field: 'name'},
    { field: 'lastname' },
    {
      field: 'birthdate',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
      cellRenderer: (params: any) => {
        if(params.value) {
          return formatDate(params.value)
        } else {
          return ''
        }
      }
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      filter: true,
      resizable: true,
    };
  }, []);

  useEffect(() => {
    setRowEmployeeData(employees)
  }, [employees])
  
  const onGridReady = useCallback(async(params: GridReadyEvent) => {
    getAllEmployees()
  }, []);

  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    let selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      setSelectedEmployees(selectedRows)
      setShowDelete(true);
    } else{
      setSelectedEmployees([])
      setShowDelete(false);
    }
  }, []);

  const handleDoubleClick = useCallback((event: any) => {
    navigate('edit-employee/' + event.data.id)
  }, []);

  const loadingOverlayComponent = useMemo<any>(() => {
    return LoadingOverlayComp;
  }, []);

  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    gridRef.current!.api.sizeColumnsToFit()
  }, [rowEmployeeData]);

  const handleDelete = useCallback(async() => {
    const emails = selectedEmployees.map((employee) => employee.email)
    await deleteEmployees(emails)
    setSelectedEmployees([])
    setShowDelete(false)
    setOpened(false)
  }, [selectedEmployees])

  const handleClickDelete = useCallback(() => {
    setOpened(true)
  }, [])

  return (
    <>
      <Group position="apart" sx={{ marginBottom: '12px' }}>
        <Text fz="xl">Employees</Text>
        <Group>
          {
            showDelete &&
            <Button
              variant="outline"
              color="red"
              onClick={handleClickDelete}
            >
              Delete employee
            </Button>
          }
          <Button
            variant="outline"
            color="blue"
            onClick={() => navigate('new-employee')}
          >
            New employee
          </Button>
        </Group>
      </Group>

      <div style={containerStyle}>
        <div style={gridStyle} className={theme.colorScheme === 'dark'? "ag-theme-alpine-dark" :"ag-theme-alpine"}>
          <AgGridReact<Employee>
            ref={gridRef}
            rowData={rowEmployeeData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            rowSelection="multiple"
            onSelectionChanged={onSelectionChanged}
            suppressRowClickSelection={true}
            onRowDoubleClicked={handleDoubleClick}
            loadingOverlayComponent={loadingOverlayComponent}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
      </div>
      <ConfirmationDialog opened={opened} setOpened={setOpened} handleDelete={handleDelete}/>
    </>
  );
};

export default Datatable;