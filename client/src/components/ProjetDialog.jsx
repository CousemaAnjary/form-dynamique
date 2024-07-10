import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Plus } from 'lucide-react';
  
  export function ProjectDialog() {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center space-x-2 w-full justify-center p-3 py-7 mb-2 text-base bg-blue-900 text-white">
            Nouveau
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Créer le projet: Détails du projet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <Label htmlFor="project-title">Titre du projet (requis)</Label>
              <Input
                id="project-title"
                placeholder="Veuillez saisir un titre pour votre projet"
              />
            </div>
            <div className="grid gap-4">
              <Label htmlFor="project-description">Description</Label>
              <Input
                id="project-description"
                placeholder="Veuillez saisir une courte description ici"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-4">
                <Label htmlFor="project-sector">Secteur (requis)</Label>
                <select
                  id="project-sector"
                  className="border rounded px-4 py-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionner…
                  </option>
                  <option value="tech">Tech</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="project-country">Pays (requis)</Label>
                <select
                  id="project-country"
                  className="border rounded px-4 py-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionner…
                  </option>
                  <option value="france">France</option>
                  <option value="usa">USA</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">RETOUR</Button>
            <Button type="submit">CRÉER LE PROJET</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  