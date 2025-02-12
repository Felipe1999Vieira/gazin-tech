import { useEffect, useState } from "react";

interface NivelFormProps {
  onSubmit: (formData: Nivel) => void;
  initialData?: Nivel;
}

interface Nivel {
  id: number;
  nivel: string;
}

export default function NivelForm({ onSubmit, initialData }: NivelFormProps) {
  const [formData, setFormData] = useState<Nivel>({
    id: 1,
    nivel: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (key: keyof Nivel, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <label className="block mb-2">Nível</label>

      <input
        type="text"
        value={formData.nivel}
        onChange={(e) => handleChange("nivel", e.target.value)}
        className="w-full border p-4 rounded-md mb-4 bg-neutral-700 border-neutral-800"
        placeholder="Digite o nome"
      />

      <button
        type="submit"
        className="block w-full rounded-md bg-indigo-600 px-3 py-4 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        Salvar
      </button>
    </form>
  );
}
