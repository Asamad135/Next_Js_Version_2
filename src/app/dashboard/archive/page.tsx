'use client'
import React, { useState } from 'react';
import {
  Content,
  Form,
  Stack,
  TextInput,
  Select,
  SelectItem,
  Button,
  DataTable,
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  Modal,
} from '@carbon/react';
import {
  TrashCan,
  Save,
  Download,
  Add,
  DocumentExport,
  Reset,
  Archive as ArchiveIcon,
} from '@carbon/icons-react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from '@/styles/Dashboard.module.scss';

interface ArchiveRow {
  id: string;
  sourcePath: string;
  destinationPath: string;
  archiveType: string;
  status: string;
  createdAt: string;
}

interface FormValues {
  sourcePath: string;
  destinationPath: string;
  archiveType: string;
}

interface TableCellType {
  id: string;
  value: any;
}

interface TableRowType {
  id: string;
  cells: TableCellType[];
}

interface TableHeader {
  key: string;
  header: string;
}

const headers: TableHeader[] = [
  { key: 'id', header: 'ID' },
  { key: 'sourcePath', header: 'Source Path' },
  { key: 'destinationPath', header: 'Destination Path' },
  { key: 'archiveType', header: 'Archive Type' },
  { key: 'status', header: 'Status' },
  { key: 'createdAt', header: 'Created At' },
];

const initialRows: ArchiveRow[] = [
  {
    id: '1',
    sourcePath: '/documents/reports',
    destinationPath: '/archives/reports.zip',
    archiveType: 'ZIP',
    status: 'Complete',
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    sourcePath: '/media/images',
    destinationPath: '/archives/images.7z',
    archiveType: '7Z',
    status: 'In Progress',
    createdAt: '2024-01-21',
  },
  {
    id: '3',
    sourcePath: '/media/image',
    destinationPath: '/archives/images.8z',
    archiveType: 'AF',
    status: 'In Progress',
    createdAt: '2024-01-21',
  },
  {
    id: '4',
    sourcePath: '/picture/images',
    destinationPath: '/archives/images.AF',
    archiveType: 'AF',
    status: 'In Progress',
    createdAt: '2024-01-21',
  },
];

const validationSchema = Yup.object().shape({
  sourcePath: Yup.string().required('Source path is required'),
  destinationPath: Yup.string().required('Destination path is required'),
  archiveType: Yup.string().required('Archive type is required')
});

export default function Archive() {
  const initialValues: FormValues = {
    sourcePath: '',
    destinationPath: '',
    archiveType: 'zip'
  };

  const [tableRows, setTableRows] = useState<ArchiveRow[]>(initialRows);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRowsForDelete, setSelectedRowsForDelete] = useState<ArchiveRow[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    const newRow: ArchiveRow = {
      id: `${Date.now()}`,
      sourcePath: values.sourcePath,
      destinationPath: values.destinationPath,
      archiveType: values.archiveType.toUpperCase(),
      status: 'Complete',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTableRows([newRow, ...tableRows]);
    setSubmitting(false);
    resetForm();
    setIsSuccessModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    const selectedIds = selectedRowsForDelete.map(row => row.id);
    const updatedRows = tableRows.filter(row => !selectedIds.includes(row.id));
    setTableRows(updatedRows);
    setIsDeleteModalOpen(false);
    setSelectedRowsForDelete([]);
  };

  const handleBatchAction = (selectedRows: ArchiveRow[]) => (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedRows || selectedRows.length === 0) return;

    const actionType = event.currentTarget.textContent?.trim().toLowerCase();
    
    switch (actionType) {
      case 'delete':
        setSelectedRowsForDelete(selectedRows);
        setIsDeleteModalOpen(true);
        break;
      
      case 'download':
        selectedRows.forEach(row => {
          const link = document.createElement('a');
          const filename = row.destinationPath.split('/').pop() || '';
          link.download = filename;
          link.href = `data:application/octet-stream;base64,${btoa('Sample archive content')}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
        break;

      case 'save':
        console.log('Saving:', selectedRows);
        break;
    }
  };

  return (
    <Content className={styles.contentContainer}>
      <div className={styles.archiveWrapper}>
        <h1 className={styles.pageTitle}>Archive Files</h1>
        
        <Formik
          initialValues={{
            sourcePath: '',
            destinationPath: '',
            archiveType: 'zip'
          }}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues, helpers: FormikHelpers<FormValues>) => handleSubmit(values, helpers)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Stack gap={6} className={styles.formStack}>
                <TextInput
                  id="sourcePath"
                  name="sourcePath"
                  labelText="Source Path"
                  placeholder="Enter path to files you want to archive"
                  value={values.sourcePath}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!(touched.sourcePath && errors.sourcePath)}
                  invalidText={errors.sourcePath}
                  className={styles.formInput}
                />
                
                <TextInput
                  id="destinationPath"
                  name="destinationPath"
                  labelText="Destination Path"
                  placeholder="Enter where you want to save the archive"
                  value={values.destinationPath}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!(touched.destinationPath && errors.destinationPath)}
                  invalidText={errors.destinationPath}
                  className={styles.formInput}
                />

                <Select
                  id="archiveType"
                  name="archiveType"
                  labelText="Archive Type"
                  value={values.archiveType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!(touched.archiveType && errors.archiveType)}
                  invalidText={errors.archiveType}
                  className={styles.formInput}
                >
                  <SelectItem value="zip" text="AF" />
                  <SelectItem value="rar" text="RAR" />
                  <SelectItem value="7z" text="ZIP" />
                  <SelectItem value="tar" text="TAR" />
                </Select>

                <div className={styles.buttonContainer}>
                  <Button 
                    type="submit" 
                    kind="primary" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                    renderIcon={ArchiveIcon}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Archive'}
                  </Button>
                </div>
              </Stack>
            </Form>
          )}
        </Formik>

        <DataTable rows={tableRows} headers={headers}>
          {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps,
          }: any) => {
            const batchActionProps = getBatchActionProps();

            return (
              <TableContainer
                title="Archive History"
                description="Manage your archived files"
                {...getTableContainerProps()}>
                <TableToolbar {...getToolbarProps()}>
                  <TableBatchActions {...batchActionProps}>
                    <TableBatchAction
                      renderIcon={TrashCan}
                      onClick={handleBatchAction(selectedRows)}>
                      Delete
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Download}
                      onClick={handleBatchAction(selectedRows)}>
                      Download
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Save}
                      onClick={handleBatchAction(selectedRows)}>
                      Save
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}>
                    <TableToolbarSearch
                      persistent={true}
                      tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                      onChange={onInputChange}
                    />
                    <TableToolbarMenu>
                      <TableToolbarAction 
                        onClick={() => console.log('Export')}
                      >
                        <DocumentExport /> Export
                      </TableToolbarAction>
                      <TableToolbarAction 
                        onClick={() => console.log('Refresh')}
                      >
                        <Reset /> Refresh
                      </TableToolbarAction>
                    </TableToolbarMenu>
                    <Button
                      size="sm"
                      kind="primary"
                      onClick={() => console.log('Add new')}
                      renderIcon={Add}
                    >
                      Add new
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header: TableHeader) => (
                        <TableHeader key={header.key} {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: TableRowType) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell: TableCellType) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </DataTable>

        <Modal
          modalHeading="Success"
          primaryButtonText="OK"
          secondaryButtonText={null}
          open={isSuccessModalOpen}
          onRequestClose={() => setIsSuccessModalOpen(false)}
          onRequestSubmit={() => setIsSuccessModalOpen(false)}
        >
          <p>Archive has been created successfully!</p>
        </Modal>

        <Modal
          modalHeading="Delete Archive"
          primaryButtonText="Delete"
          secondaryButtonText="Cancel"
          open={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          onRequestSubmit={handleDeleteConfirm}
          danger
        >
          <p>
            Are you sure you want to delete {selectedRowsForDelete.length} selected {selectedRowsForDelete.length === 1 ? 'item' : 'items'}?
            This action cannot be undone.
          </p>
        </Modal>
      </div>
    </Content>
  );
}