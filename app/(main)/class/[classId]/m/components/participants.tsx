"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartBarIcon,
  ChevronDownIcon,
  Download,
  MoreHorizontal,
  SortAscIcon,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { useModalStore } from "@/hooks/use-modal-store";
import { MeetingData } from "@/hooks/api/meeting-service-hooks";
import ActionTooltip from "@/components/action-tooltip";
import { RecognitionsDetail } from "@/hooks/api/recognition-service-hooks";

export interface UserParticipant {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  joinAt: string;
  leftAt: string;
  user: {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
  };
}

const fuzzyFilter: FilterFn<UserParticipant> = (row, columnId, filterValue: string) => {
  const searchValue = filterValue.toLowerCase();

  // Search in user object
  if (row.original.user) {
    if (
      row.original.user.fullname.toLowerCase().includes(searchValue) ||
      row.original.user.email.toLowerCase().includes(searchValue)
    ) {
      return true;
    }
  }

  // Search in join date
  if (row.original.joinAt) {
    if (new Date(row.original.joinAt).toLocaleString().toLowerCase().includes(searchValue)) {
      return true;
    }
  }

  return false;
};

export const columnsData: ColumnDef<UserParticipant>[] = [
  {
    accessorKey: "status",
    header: () => (
      <div style={{ textAlign: "center" }}>
        Status
      </div>
    ),
    cell: ({ row }) => {
      const [participantStatus, setParticipantStatus] = React.useState<string | null>(null);
      const [isPopupOpen, setIsPopupOpen] = React.useState(false);

      // Fungsi cek status Google Meet
      const checkGoogleMeetStatus = () => {
        const isUserInGoogleMeet = window.location.href.includes("meet.google.com");
        const status = isUserInGoogleMeet ? "Aktif" : "Tidak Aktif";
        setParticipantStatus(status);
      };

      React.useEffect(() => {
        const statusInterval = setInterval(() => {
          checkGoogleMeetStatus();
        }, 1000);

        return () => clearInterval(statusInterval);
      }, []);

      const getColor = () => {
        if (participantStatus === "Aktif") return "green";
        if (participantStatus === "Tidak Aktif") return "red";
        return "gray";
      };

      return (
        <>
          <div
            onClick={() => setIsPopupOpen(true)}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: getColor(),
              margin: "0 auto",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
            }}
          />

          {isPopupOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "400px",
                  height: "250px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
              <button
                onClick={() => setIsPopupOpen(false)}
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "fullname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Fullname
        <SortAscIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.original.user.fullname}</div>,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <SortAscIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.original.user.email}</div>,
    enableColumnFilter: true,
    enableSorting: true,
  },
  {
    accessorKey: "joinAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Join
        <SortAscIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{new Date(row.original.joinAt).toLocaleString()}</div>,
  },
];

export default function Participants({
  participants,
  recognitionDetail,
  meetingData,
}: {
  participants: UserParticipant[];
  meetingData: MeetingData;
  recognitionDetail: RecognitionsDetail;
}) {
  const data = participants;
  const { onOpen } = useModalStore();
  const [globalFilter, setGlobalFilter] = React.useState("");

  const getActionsColumn = (): ColumnDef<UserParticipant> => ({
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const classId = meetingData?.classId || '';
      const meetingId = meetingData?.id || '';
      const participantId = row.original.user.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/class/${classId}/m/${meetingId}/participant/${participantId}`}
                className="flex items-center"
              >
                <ChartBarIcon className="mr-2 h-4 w-4" />
                View Emotions Detail
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer">
              <UserCog className="h-4 w-4" />
              Assign as Co-Teacher
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  });

  const columns: ColumnDef<UserParticipant>[] = [
    ...columnsData,
    getActionsColumn(),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzyFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <ActionTooltip label="Export meeting data">
          <Button
            className="ml-auto mr-2"
            onClick={() => onOpen("exportMeetingData", recognitionDetail)}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </ActionTooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
