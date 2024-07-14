import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, useFieldArray } from "react-hook-form"
import { updateQuestion } from '@/services/questionService'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"



export default function QuestionSettings({ question, onClose }) {
    /**
     * ! STATE (état, données) de l'application
     */
    const form = useForm({
        defaultValues: {
            label: question.label,
            type: question.type,
            placeholder: question.placeholder,
            required: question.required ? 'true' : 'false',
            options: question.options || [],
        },
    })

    /**
     * ! COMPORTEMENT (méthodes, fonctions) de l'application
     */

    // Utiliser le hook useFieldArray pour gérer les champs de type tableau
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "options",
    })

    // Ajouter une option 
    const handleAddOption = () => {
        const options = form.getValues('options')
        if (options.length === 0 || options[options.length - 1].label.trim() !== '') {
            append({ label: '', value: '' })
        }
    }

    // Mettre à jour le label et la valeur d'une option
    const handleLabelChange = (index, value) => {
        form.setValue(`options.${index}.label`, value)
        form.setValue(`options.${index}.value`, value.toLowerCase())
    }

    // Soumettre le formulaire
    const handleSubmit = async (data) => {

        // Données à envoyer au serveur pour mettre à jour une question
        const questionData = {
            label: data.label,
            type: data.type,
            placeholder: data.placeholder,
            required: data.required === 'true',
            options: data.options.map(option => ({
                value: option.value,
                label: option.label,
            })).filter(option => option.label.trim() !== ''),
        }

        try {
            // Appeler le service pour mettre à jour une question
            await updateQuestion(question.id, questionData)
            window.location.reload()

        } catch (error) {
            console.error('Erreur lors de la mise à jour de la question', error)
        }
    }
    /**
     * ! AFFICHAGE (render) de l'application
     */
    return (
        <div className="border rounded p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold font-mono text-blue-900">Modifier la question</h2>
                <Button variant="outline" size="sm" className="ml-2" onClick={onClose}>
                    <X size={16} />
                </Button>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Label</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className="shadow-sm" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="text">Text</SelectItem>
                                                        <SelectItem value="email">Email</SelectItem>
                                                        <SelectItem value="password">Password</SelectItem>
                                                        <SelectItem value="radio">Radio</SelectItem>
                                                        <SelectItem value="checkbox">Checkbox</SelectItem>
                                                        <SelectItem value="select">Select</SelectItem>
                                                        <SelectItem value="file">File</SelectItem>
                                                        <SelectItem value="date">Date</SelectItem>
                                                        <SelectItem value="number">Number</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="required"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel>Réponse Obligatoire:</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="flex flex-col space-y-1"
                                                    >
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="true" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Oui
                                                            </FormLabel>
                                                        </FormItem>
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="false" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Non
                                                            </FormLabel>
                                                        </FormItem>
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="placeholder"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Placeholder</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Veuillez saisir une placeholder" className="shadow-sm" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {(form.watch('type') === 'select' || form.watch('type') === 'radio') && (
                                <div className="grid gap-2 mt-6">
                                    <FormLabel>Options</FormLabel>
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="flex gap-2">
                                            <Input
                                                {...form.register(`options.${index}.label`)}
                                                placeholder={`Option ${index + 1}`}
                                                className="shadow-sm mb-2 mt-1"
                                                onChange={(e) => handleLabelChange(index, e.target.value)}
                                            />
                                            <Button type="button" variant="outline" className="mt-1" onClick={() => remove(index)}>Supprimer</Button>
                                        </div>
                                    ))}
                                    <Button type="button" onClick={handleAddOption} className="bg-blue-900">Ajouter une option</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-end mt-4">
                        <Button type='submit' className="bg-blue-900">Enregistrer</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
