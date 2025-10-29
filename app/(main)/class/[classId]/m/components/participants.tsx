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
import { Label } from "@/components/ui/label";

export interface UserParticipant {
  id: string;
  fullname: string;
  email: string;
  avatar: string;
  joinAt: string;
  leftAt: string;
  status: number;
  leave_count: number;
  user: {
    id: string;
    fullname: string;
    email: string;
    avatar: string;
  };
}

const fuzzyFilter: FilterFn<UserParticipant> = (row, columnId, filterValue) => {
  const searchValue = filterValue.toLowerCase();
  if (row.original.user) {
    if (
      row.original.user.fullname.toLowerCase().includes(searchValue) ||
      row.original.user.email.toLowerCase().includes(searchValue)
    )
      return true;
  }
  if (row.original.joinAt) {
    if (
      new Date(row.original.joinAt)
        .toLocaleString()
        .toLowerCase()
        .includes(searchValue)
    )
      return true;
  }
  return false;
};

const StatusHeader: React.FC<{ isOn: boolean; toggle: () => void }> = ({
  isOn,
  toggle,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        className="flex items-center"
      >
        Status
        <SortAscIcon className="ml-2 h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute left-0 mt-2 bg-white border rounded-md shadow-md p-2 z-20">
          <div className="flex items-center space-x-2">
            <Label htmlFor="status-toggle">On/Off</Label>
            <Button
              id="status-toggle"
              size="sm"
              variant={isOn ? "default" : "outline"}
              onClick={toggle}
            >
              {isOn ? "ON" : "OFF"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Participants({
  participants,
  recognitionDetail,
  meetingData,
}: {
  participants: UserParticipant[];
  meetingData: MeetingData;
  recognitionDetail: RecognitionsDetail;
}) {
  const { onOpen } = useModalStore();
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [statusOn, setStatusOn] = React.useState(true); // kontrol utama

  const data = React.useMemo(() => participants, [participants]);

  const columns = React.useMemo<ColumnDef<UserParticipant>[]>(() => {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            disabled={!statusOn}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            disabled={!statusOn}
          />
        ),
      },
      {
        accessorKey: "fullname",
        header: "Fullname",
        cell: ({ row }) => (
          <div className="capitalize">{row.original.user.fullname}</div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="lowercase">{row.original.user.email}</div>
        ),
      },
      {
        accessorKey: "joinAt",
        header: "Last Join",
        cell: ({ row }) => (
          <div className="lowercase">
            {new Date(row.original.joinAt).toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: () => (
          <StatusHeader isOn={statusOn} toggle={() => setStatusOn(!statusOn)} />
        ),
        cell: ({ row }) => {
          const { status, leave_count } = row.original;

          if (!statusOn) {
            return (
              <div className="flex items-center gap-2 text-gray-500">
                <span>🔘</span>
                <span>deteksi berhenti</span>
              </div>
            );
          }

          if (status === 1) {
            return (
              <div className="flex items-center gap-2">
                <span className="text-green-500">🟢</span>
                <span>Active</span>
                {leave_count > 0 && (
                  <ActionTooltip label={`Terdeteksi Keluar : ${leave_count}`}>
                    <Label>({leave_count})</Label>
                  </ActionTooltip>
                )}
              </div>
            );
          } else if (status === 0) {
            return (
              <div className="flex items-center gap-2">
                <span className="text-red-500">🔴</span>
                <span>Inactive</span>
                {leave_count > 0 && (
                  <ActionTooltip label={`Terdeteksi Keluar : ${leave_count}`}>
                    <Label>({leave_count})</Label>
                  </ActionTooltip>
                )}
              </div>
            );
          } else {
            return (
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">🟡</span>
                <span>Pending</span>
              </div>
            );
          }
        },
      },
      {
        header: "Actions",
        id: "actions",
        cell: ({ row }) => {
          const classId = meetingData?.classId || "";
          const meetingId = meetingData?.id || "";
          const participantId = row.original.user.id;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  disabled={!statusOn}
                >
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
      },
    ];
  }, [statusOn]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzyFilter },
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
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
  });

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
          disabled={!statusOn}
        />
        <ActionTooltip label="Export meeting data">
          <Button
            className="ml-auto mr-2"
            onClick={() => onOpen("exportMeetingData", recognitionDetail)}
            disabled={!statusOn}
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </ActionTooltip>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-400"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
