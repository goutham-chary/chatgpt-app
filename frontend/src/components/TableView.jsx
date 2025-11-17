import { useTheme } from '../context/ThemeContext';

export const TableView = ({ table }) => {
  const { isDark } = useTheme();

  if (!table || !table.columns || !table.rows) return null;

  return (
    <div className={`overflow-x-auto rounded-lg border ${
      isDark ? 'border-gray-700' : 'border-gray-200'
    } shadow-md`}>
      <table className="min-w-full divide-y divide-current">
        <thead className={isDark ? 'bg-gray-800' : 'bg-gray-100'}>
          <tr>
            {table.columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
          {table.rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`transition-colors ${
                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
              }`}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
