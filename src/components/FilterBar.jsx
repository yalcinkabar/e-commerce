function FilterBar() {
    return (
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 lg:flex-row">
            <p className="text-sm font-bold text-[#737373]">
                Showing all 12 results
            </p>

            <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#737373]">
                    Views:
                </span>

                <button className="flex h-12 w-12 items-center justify-center rounded border border-[#ECECEC]">
                    ⊞
                </button>

                <button className="flex h-12 w-12 items-center justify-center rounded border border-[#ECECEC]">
                    ☰
                </button>
            </div>

            <div className="flex gap-4">
                <select className="rounded border px-4 py-2 text-sm text-[#737373]">
                    <option>Popularity</option>
                </select>

                <button className="rounded bg-[#23A6F0] px-6 py-2 text-white">
                    Filter
                </button>
            </div>
        </div>
    );
}

export default FilterBar;