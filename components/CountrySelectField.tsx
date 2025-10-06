import React, { useState, useMemo } from 'react';
import { useController } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown } from 'lucide-react';
import countryList from 'react-select-country-list';
import ReactCountryFlag from "react-country-flag"

interface CountrySelectProps {
  name: string;
  label: string;
  control: any;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const CountrySelectField = ({ 
  name, 
  label, 
  control, 
  error, 
  required = false,
  placeholder = "Select a country..."
}: CountrySelectProps) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { field } = useController({
    name,
    control,
    rules: { 
      required: required ? `${label} is required` : false 
    },
    defaultValue: ''
  });

  // Get country data
  const countries = useMemo(() => countryList().getData(), []);
  
  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!searchValue) return countries;
    
    const searchLower = searchValue.toLowerCase();
    return countries.filter(country =>
      country.label.toLowerCase().includes(searchLower) ||
      country.value.toLowerCase().includes(searchLower)
    );
  }, [searchValue, countries]);

  // Find selected country for display
  const selectedCountry = countries.find(country => country.value === field.value);

  const handleSelect = (countryValue: string) => {
    const country = countries.find(c => c.value === countryValue);
    if (country) {
      field.onChange(country.value);
      setOpen(false);
      setSearchValue('');
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="country-select-trigger flex items-center" 
            id={name}
          >
            <div className="flex items-center gap-3 flex-1 text-left">
              {selectedCountry ? (
                <>
                  <ReactCountryFlag
                    countryCode={selectedCountry.value}
                    svg
                    style={{
                      width: '20px',
                      height: '12px',
                      borderRadius: '2px',
                      flexShrink: 0,
                    }}
                    title={selectedCountry.label}
                  />
                  <span className="font-medium truncate">{selectedCountry.label}</span>
                </>
              ) : (
                <span className="text-muted-foreground truncate">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0 bg-gray-800 border-gray-600" align="start">
          <Command shouldFilter={false} className="bg-gray-800">
            <CommandInput 
              placeholder="Search countries..." 
              value={searchValue}
              onValueChange={setSearchValue}
              className="country-select-input"
            />
            
            <CommandList className="bg-gray-800">
              <ScrollArea className="h-64 bg-gray-800">
                <CommandEmpty className="country-select-empty">
                  No country found. Try a different search.
                </CommandEmpty>
                
                <CommandGroup className="bg-gray-800 p-0">
                  {filteredCountries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.value}
                      onSelect={handleSelect}
                      className="country-select-item flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <ReactCountryFlag
                          countryCode={country.value}
                          svg
                          style={{
                            width: '24px',
                            height: '16px',
                            borderRadius: '2px',
                            flexShrink: 0,
                          }}
                          title={country.label}
                        />
                        <span className="font-medium flex-1">{country.label}</span>
                      </div>
                      
                      <Check
                        className={`h-4 w-4 flex-shrink-0 ${
                          field.value === country.value 
                            ? "opacity-100 text-primary" 
                            : "opacity-0"
                        }`}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
};

export default CountrySelectField;